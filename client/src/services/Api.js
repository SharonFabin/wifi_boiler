import config from "../config/index.js";

const scheduleBoiler = (from, to) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openFrom: from, openTo: to }),
    };
    fetch(
        `http://${config.web.ip}:${config.web.server_port}/boiler/schedule`,
        requestOptions
    ).then((response) => response.json());
};

const openBoiler = (time) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ openDuration: time }),
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

export { openBoiler, closeBoiler, scheduleBoiler };
