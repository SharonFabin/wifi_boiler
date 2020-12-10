import express from "express";
import SwitchService from "../../services/switch_service.js";
import {
    addNest,
    eventsHandler,
    status,
} from "../../controllers/boiler-controller.js";
const router = express.Router();
//const switchService = new SwitchService(15);
export default (app) => {
    app.use("/boiler", router);
    router.post("/nest", addNest);
    router.get("/events", eventsHandler);
    router.get("/status", status);
    // router.get("/open", function (req, res, next) {
    //     switchService.OpenBoiler();
    //     res.send("open");
    // });

    // router.get("/close", function (req, res, next) {
    //     switchService.CloseBoiler();
    //     res.send("close");
    // });
};
