import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    TimePicker,
    DatePicker,
} from "@material-ui/pickers";
import { createMuiTheme, withTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
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
    autoOk: true,
};

const TimeRangePicker = (props) => {
    const [selectedDate, setDate] = useState(new Date());
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const onChangeDate = (val) => {
        setDate(val);
        props.onChangeDate(val);
    };
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
                <div>
                    <Row className="center spaced">
                        <div>
                            <DatePicker
                                value={selectedDate}
                                onChange={onChangeDate}
                                animateYearScrolling
                                disablePast={true}
                                autoOk={true}
                                todayLabel={"היום"}
                                okLabel={"אשר"}
                                cancelLabel={"בטל"}
                                showTodayButton={true}
                            />
                        </div>
                    </Row>
                    <Row className="center">
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
                    </Row>
                </div>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};

export default TimeRangePicker;
