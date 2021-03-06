import config from "../config/index.js";
import { db } from "../config/db.js";
import SwitchService from "../services/switch_service.js";
const switchService = new SwitchService(config.boiler.pin, 1);
let clients = [];
let boiler = {
    open: false,
    openDuration: 0,
    lastOpened: Date.now(),
    reservations: {},
};
let boilerTimeout;
let reservationTimeouts = {};

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

async function scheduleBoiler(req, res, next) {
    const boilerData = req.body;
    if (
        Object.values(boiler.reservations).some(
            (r) => r.openFrom === boilerData.openFrom
        )
    ) {
        res.status(500).send({
            message:
                "Reservation with this start time has already been submitted.",
        });
    } else {
        const reservation = {
            openFrom: boilerData.openFrom,
            openTo: boilerData.openTo,
        };
        db.collection("reservations").insertOne(reservation, (err) => {
            if (err != null) {
                res.status(500).send({
                    message: err,
                });
                return;
            }

            const timeoutDuration = boilerData.openFrom - new Date().getTime();
            const reservedDuration =
                (reservation.openTo - reservation.openFrom) / 1000;
            boiler.reservations[reservation._id] = {
                openFrom: reservation.openFrom,
                openTo: reservation.openTo,
            };
            reservationTimeouts[reservation._id] = setTimeout(
                (id, duration) => {
                    delete reservationTimeouts[id];
                    delete boiler.reservations[id];
                    startBoiler(duration);
                },
                timeoutDuration,
                reservation._id,
                reservedDuration
            );
            sendEventsToAll(boiler);
            res.sendStatus(200);
        });
    }
}

async function deleteReservation(req, res, next) {
    const data = req.body;
    const query = { _id: data._id };
    db.collection("reservations").deleteOne(query, (err) => {
        if (err != null) {
            res.status(500).send({
                message: err,
            });
            return;
        }
        clearTimeout(reservationTimeouts[data._id]);
        delete reservationTimeouts[data._id];
        delete boiler.reservations[data._id];
        sendEventsToAll(boiler);
        res.sendStatus(200);
    });
}

async function openBoiler(req, res, next) {
    const boilerData = req.body;
    startBoiler(boilerData.openDuration);
    res.sendStatus(200);
}

async function closeBoiler(req, res, next) {
    stopBoiler();
    res.sendStatus(200);
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

export {
    eventsHandler,
    status,
    openBoiler,
    closeBoiler,
    scheduleBoiler,
    deleteReservation,
};
