import express from "express";
import {
    eventsHandler,
    status,
    openBoiler,
    closeBoiler,
} from "../../controllers/boiler-controller.js";
const router = express.Router();
export default (app) => {
    app.use("/boiler", router);
    router.post("/open", openBoiler);
    router.post("/close", closeBoiler);
    router.get("/events", eventsHandler);
    router.get("/status", status);
};
