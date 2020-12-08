import express from "express";
import boiler from "./routes/boiler.js";

export default () => {
    const app = express.Router();
    boiler(app);
    return app;
};
