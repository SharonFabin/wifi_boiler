import express from "express";
import {
    eventsHandler,
    status,
    openBoiler,
    closeBoiler,
    scheduleBoiler,
    deleteReservation,
} from "../../controllers/boiler_controller.js";
const router = express.Router();
export default (app) => {
    app.use("/boiler", router);
    router.post("/delete", deleteReservation);
    router.post("/schedule", scheduleBoiler);
    router.post("/open", openBoiler);
    router.post("/close", closeBoiler);
    router.get("/events", eventsHandler);
    router.get("/status", status);
};
