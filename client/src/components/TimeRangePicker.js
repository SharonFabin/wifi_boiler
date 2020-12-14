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

const TimeRangePicker = (props) => {
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    return (
        <ThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div className="time-picker">
                    <TimePicker
                        value={fromDate}
                        onChange={setFromDate}
                        ampm={false}
                        views={["hours", "minutes", "seconds"]}
                        showTodayButton={true}
                        okLabel="אשר"
                        cancelLabel="בטל"
                        todayLabel="עכשיו"
                    />
                </div>
                <div className="dash">{"→"}</div>
                <div className="time-picker">
                    <TimePicker
                        value={toDate}
                        onChange={setToDate}
                        ampm={false}
                        views={["hours", "minutes", "seconds"]}
                        showTodayButton={true}
                        okLabel="אשר"
                        cancelLabel="בטל"
                        todayLabel="עכשיו"
                    />
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default TimeRangePicker;
