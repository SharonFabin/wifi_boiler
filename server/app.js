import express from "express";
import config from "./config/index.js";
import routes from "./api/index.js";
import cors from "cors";
import bodyparser from "body-parser";

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({ extended: false }));
    app.use("/", routes());
    app.listen(config.web.port, () => {
        console.log(`
			################################################
			🛡️  Server listening on port: ${config.web.port} 🛡️
			################################################
    	`);
    }).on("error", (err) => {
        console.error(err);
        process.exit(1);
    });
}

startServer();
