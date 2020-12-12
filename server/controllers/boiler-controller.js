import SwitchService from "../services/switch_service.js";
import config from "../config/index.js";
const switchService = new SwitchService(config.boiler.pin, 1);
let clients = [];
let boiler = {
    open: false,
    openDuration: 0,
    lastOpened: Date.now(),
};
let boilerTimeout;

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
function sendEventsToAll(data) {
    clients.forEach((c) => c.res.write(`data: ${JSON.stringify(data)}\n\n`));
}

// Updates boiler data and resets timer
async function openBoiler(req, res, next) {
    const boilerData = req.body;
    boiler = { ...boilerData, lastOpened: Date.now() };
    clearTimeout(boilerTimeout);
    switchService.switchOn();
    boilerTimeout = setTimeout(() => {
        switchService.switchOff();
    }, boiler.openDuration);
    res.json(boiler);
    sendEventsToAll(boiler);
}

async function closeBoiler(req, res, next) {
    clearTimeout(boilerTimeout);
    switchService.switchOff();
    boiler.open = false;
    boiler.openDuration = 0;
    boiler.lastOpened = Date.now();
    sendEventsToAll(boiler);
    res.json(boiler);
}

function status(req, res, next) {
    return res.json({ clients: clients.length });
}

export { eventsHandler, status, openBoiler, closeBoiler };
