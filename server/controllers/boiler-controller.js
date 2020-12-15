import SwitchService from "../services/switch_service.js";
import config from "../config/index.js";
const switchService = new SwitchService(config.boiler.pin, 1);
let clients = [];
let boiler = {
    open: false,
    openDuration: 0,
    lastOpened: Date.now(),
    openFrom: 0,
    openTo: 0,
};
let boilerTimeout;
let scheduleTimeout;

function eventsHandler(req, res, next) {
    const headers = {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);
    const data = `data: ${JSON.stringify(boiler)}\n\n`;
    res.write(data);
    const clientId = Date.now();
    const newClient = {
        id: clientId,
        res,
    };
    clients.push(newClient);
    req.on("close", () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter((c) => c.id !== clientId);
    });
}

// Iterate clients list and use write res object method to send new nest

async function scheduleBoiler(req, res, next) {
    const boilerData = req.body;
    boiler.openTo = boilerData.openTo;
    boiler.openFrom = boilerData.openFrom;
    clearTimeout(scheduleTimeout);
    scheduleTimeout = setTimeout(() => {
        startBoiler(boilerData.openTo - boilerData.openFrom);
    }, (boilerData.openFrom - new Date().getTime() / 1000) * 1000);
    sendEventsToAll(boiler);
}

// Updates boiler data and resets timer
async function openBoiler(req, res, next) {
    const boilerData = req.body;
    startBoiler(boilerData.openDuration);
    res.json(boiler);
}

async function closeBoiler(req, res, next) {
    stopBoiler();
    res.json(boiler);
}

const startBoiler = (duration) => {
    clearTimeout(boilerTimeout);
    switchService.switchOn();
    boiler.open = true;
    boiler.openDuration = duration;
    boiler.lastOpened = Date.now();
    boilerTimeout = setTimeout(() => {
        switchService.switchOff();
    }, boiler.openDuration * 1000);
    sendEventsToAll(boiler);
};

const stopBoiler = () => {
    clearTimeout(boilerTimeout);
    switchService.switchOff();
    boiler.open = false;
    boiler.openDuration = 0;
    boiler.lastOpened = Date.now();
    sendEventsToAll(boiler);
};

function sendEventsToAll(data) {
    clients.forEach((c) => c.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

function status(req, res, next) {
    return res.json({ clients: clients.length });
}

export { eventsHandler, status, openBoiler, closeBoiler, scheduleBoiler };
