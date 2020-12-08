import rpio from "rpio";

class SwitchService {
    constructor(boilerPin) {
        this.boilerPin = boilerPin;
        this.open = false;
        rpio.open(this.boilerPin, rpio.OUTPUT, rpio.LOW);
    }

    async OpenBoiler() {
        if (this.open) {
            throw new Error("Boiler already open.");
        }
        rpio.write(this.boilerPin, rpio.HIGH);
        this.open = true;
        //TODO: save to DB
    }

    async CloseBoiler() {
        if (!this.open) {
            throw new Error("Boiler already closed.");
        }
        rpio.write(this.boilerPin, rpio.LOW);
        this.open = false;
        //TODO: save to DB
    }
}

export default SwitchService;
