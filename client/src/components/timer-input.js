import React from "react";
import TimeInput from "react-time-input";

class TimerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    onTimeChangeHandler(val) {
        alert(val);
    }

    render() {
        return (
            <TimeInput
                initTime="11:12"
                ref="TimeInputWrapper"
                className="form-control"
                mountFocus="true"
                onTimeChange={this.onTimeChangeHandler}
            />
        );
    }
}

export default TimerInput;
