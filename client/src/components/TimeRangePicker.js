import { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { createMuiTheme, withTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import lightBlue from "@material-ui/core/colors/lightBlue";
import "./TimeRangePicker.css";

const materialTheme = createMuiTheme({
    overrides: {
        MuiInput: {
            root: {
                fontSize: "1.5rem",
            },
            underline: {
                color: "white",
                "&:before": {
                    borderBottom: "1px solid white",
                },
            },
        },
    },
});

const defaultTimeProps = {
    ampm: false,
    views: ["hours", "minutes"],
    showTodayButton: true,
    okLabel: "אשר",
    cancelLabel: "בטל",
    todayLabel: "עכשיו",
};

const TimeRangePicker = (props) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const onChangeFrom = (val) => {
        setFromDate(val);
        if (val > toDate) setToDate(val);
        props.onChangeFrom(val);
    };
    const onChangeTo = (val) => {
        if (val < fromDate) val = fromDate;
        setToDate(val);
        props.onChangeTo(val);
    };
    return (
        <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="time-picker">
                    <TimePicker
                        {...defaultTimeProps}
                        value={fromDate}
                        onChange={onChangeFrom}
                    />
                </div>
                <div className="dash">{"→"}</div>
                <div className="time-picker">
                    <TimePicker
                        {...defaultTimeProps}
                        value={toDate}
                        onChange={onChangeTo}
                    />
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default TimeRangePicker;
