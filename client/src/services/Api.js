import config from "../config/index.js";

const updateBoiler = (time) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open: true, openDuration: time }),
    };
    fetch(
        `http://${config.web.ip}:${config.web.server_port}/boiler/open`,
        requestOptions
    ).then((response) => response.json());
};

const closeBoiler = () => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "",
    };
    fetch(
        `http://${config.web.ip}:${config.web.server_port}/boiler/close`,
        requestOptions
    ).then((response) => response.json());
};

export { updateBoiler, closeBoiler };
