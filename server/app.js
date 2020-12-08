import express from "express";
import config from "./config/index.js";
import routes from "./api/index.js";

async function startServer() {
    const app = express();
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
