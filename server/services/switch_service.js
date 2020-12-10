import rpio from "rpio";

class SwitchService {
    constructor(pin, onState) {
        this.pin = pin;
        this.open = false;
        if (onState == 0) {
            this.onState = rpio.LOW;
            this.offState = rpio.HIGH;
        } else {
            this.onState = rpio.HIGH;
            this.offState = rpio.LOW;
        }
        rpio.open(this.pin, rpio.OUTPUT, this.offState);
    }

    async switchOn() {
        if (!this.open) {
            rpio.write(this.boilerPin, this.onState);
            this.open = true;
            //TODO: save to DB
        }
    }

    async switchOff() {
        if (this.open) {
            rpio.write(this.boilerPin, this.offState);
            this.open = false;
            //TODO: save to DB
        }
    }
}

export default SwitchService;
