import SwitchService from "../services/switch_service.js";

const switchService = new SwitchService(15);
let clients = [];
let boiler = {
    open: false,
    lastOpened: new Date().now,
    openDuration: 0,
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
    const data = req.body;
    boiler = data;
    clearTimeout(boilerTimeout);
    switchService.switchOn();
    boilerTimeout = setTimeout(() => {
        switchService.switchOff();
    }, boilerData.openDuration);
    res.json(boilerData);
    sendEventsToAll(boilerData);
}

async function closeBoiler(req, res, next) {
    clearTimeout(boilerTimeout);
    switchService.switchOff();
    boiler = {
        open: false,
        lastOpened: new Date().now,
        openedFor: 0,
    };
    sendEventsToAll(boiler);
    res.json(boiler);
}

function status(req, res, next) {
    return res.json({ clients: clients.length });
}

export { eventsHandler, status, openBoiler, closeBoiler };
