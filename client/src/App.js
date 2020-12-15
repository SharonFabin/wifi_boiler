import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import hot from "./resources/hot.gif";
import cold from "./resources/freeze.gif";
import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import {
    Container,
    Button,
    Row,
    Col,
    Image,
    ProgressBar,
} from "react-bootstrap";
import DateTimer from "./components/DateTimer.js";
import { openBoiler, closeBoiler, scheduleBoiler } from "./services/Api.js";
import { timeToSeconds } from "./services/TimeConverter.js";
import config from "./config/index.js";
import TimeRangePicker from "./components/TimeRangePicker";

function App() {
    const [boiler, setBoiler] = useState({
        open: false,
        openDuration: 0,
        lastOpened: 0,
    });
    const [listening, setListening] = useState(false);
    const [variantState, setVariant] = useState("primary");
    const [statusImage, setStatusImage] = useState(cold);
    const [startTime, setStartTime] = useState(new Date().getTime() / 1000);
    const [stopTime, setStopTime] = useState(new Date().getTime() / 1000);
    const onChangeFromTime = (val) => {
        setStartTime(val.getTime() / 1000);
    };
    const onChangeToTime = (val) => {
        setStopTime(val.getTime() / 1000);
    };

    useEffect(() => {
        if (!listening) {
            const events = new EventSource(
                `http://${config.web.ip}:${config.web.server_port}/boiler/events`
            );
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setBoiler(
                    (boiler) =>
                        (boiler = {
                            open: false,
                            openDuration: 0,
                            lastOpened: 0,
                        })
                );
                setBoiler((boiler) => (boiler = parsedData));
                setVariant(parsedData.open ? "danger" : "primary");
                setStatusImage(parsedData.open ? hot : cold);
            };

            setListening(true);
        }
    }, [listening, boiler]);

    return (
        <Container className="p-3 bg">
            <Row className="center">
                <Image src={statusImage} rounded className="status-image" />
            </Row>
            <Row className="center spaced">
                <ProgressBar
                    now={100}
                    label={`${100}%`}
                    animated
                    variant={variantState}
                />
            </Row>
            <Row className="center">
                <div className="content">
                    <DateTimer
                        startTime={boiler.lastOpened}
                        timerDuration={boiler.openDuration}
                    />
                </div>
            </Row>
            <Row className="center spaced">
                <Button
                    type="button"
                    className="btn btn-danger btn-circle btn-lg"
                    onClick={() => openBoiler(1800)}
                >
                    30
                </Button>
                <Button
                    type="button"
                    className="btn btn-warning btn-circle btn-lg"
                    onClick={() => openBoiler(900)}
                >
                    15
                </Button>
                <Button
                    type="button"
                    className="btn btn-info btn-circle btn-lg"
                    onClick={() => openBoiler(300)}
                >
                    5
                </Button>
            </Row>
            <Row className="center spaced">
                {/* <DatePicker picker="time" onChange={onChange} /> */}
                <TimeRangePicker
                    onChangeFrom={onChangeFromTime}
                    onChangeTo={onChangeToTime}
                />
            </Row>
            <Row className="center spaced">
                <Button
                    className="button-space"
                    variant="primary"
                    onClick={() => closeBoiler()}
                >
                    לסגור
                </Button>
                <Button
                    className="button-space"
                    variant="danger"
                    onClick={() => scheduleBoiler(startTime, stopTime)}
                >
                    לפתוח
                </Button>
            </Row>
        </Container>
    );
}

export default App;
