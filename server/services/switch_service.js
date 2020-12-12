import child from "child_process";

class SwitchService {
    constructor(pin, onState) {
        this.pin = pin;
        this.onState = onState;
        this.offState = onState == 1 ? 0 : 1;
        this.open = false;
        child.exec("dir", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }

    async switchOn() {
        if (!this.open) {
            try {
                child.exec(
                    `gpio write ${this.pin} ${this.onState}`,
                    (error, stdout, stderr) => {}
                );
            } catch (err) {
                console.log(err);
            }
            this.open = true;
            //TODO: save to DB
        }
    }

    async switchOff() {
        if (this.open) {
            try {
                child.exec(
                    `gpio write ${this.pin} ${this.offState}`,
                    (error, stdout, stderr) => {}
                );
            } catch (err) {
                console.log(err);
            }
            this.open = false;
            //TODO: save to DB
        }
    }
}

export default SwitchService;
