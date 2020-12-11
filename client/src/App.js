import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import hot from "./resources/hot.gif";
import cold from "./resources/freeze.gif";
import ReactDOM from "react-dom";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import {
    Jumbotron,
    Container,
    Button,
    Row,
    Col,
    Image,
    ProgressBar,
} from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import TimerInput from "./components/timer-input.js";
import Datetime from "react-datetime";

import "./App.css";

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
    isPlaying: true,
};
const timeToSeconds = (time) => {
    if (time != null) {
        let hours = parseInt(time.substring(0, 2), 10);
        let minutes = parseInt(time.substring(3, 5), 10);
        let seconds = parseInt(time.substring(6), 10);
        return hours * 60 * 60 + minutes * 60 + seconds;
    }
    return 0;
};
const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const DateTimer = (props) => {
    const [timerDuration, setTimerDuration] = useState(props.timerDuration);
    //const timerDuration = props.timerDuration;
    useEffect(() => {
        setTimerDuration(props.timerDuration);
    }, [props.timerDuration]);
    return (
        <CountdownCircleTimer
            {...timerProps}
            colors={[
                ["#004777", 0.33],
                ["#F7B801", 0.33],
                ["#A30000", 0.33],
            ]}
            duration={timerDuration}
            onComplete={(totalElapsedTime) => []}
            key={Math.floor(Math.random(200) * 100)}
        >
            {({ remainingTime }) => renderTime("seconds", remainingTime)}
        </CountdownCircleTimer>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time / 1000) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const meow = () => alert("meow");

const updateBoiler = (time) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ open: true, openDuration: time }),
    };
    fetch(
        "http://localhost:9000/boiler/open",
        requestOptions
    ).then((response) => response.json());
};

function App() {
    let x = 5;
    let chosenTime = "00:00:00";
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 243248; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;
    const [boiler, setBoiler] = useState({ open: false, openDuration: 0 });
    const [listening, setListening] = useState(false);
    const onChange = (date, dateString) => {
        chosenTime = dateString;
    };

    let variantState = "danger";

    useEffect(() => {
        if (!listening) {
            const events = new EventSource(
                "http://localhost:9000/boiler/events"
            );
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setBoiler((boiler) => (boiler = parsedData));
            };

            setListening(true);
        }
    }, [listening, boiler]);

    return (
        boiler && (
            <Container className="p-3 bg">
                <Row className="center">
                    <Image src={cold} rounded className="status-image" />
                </Row>
                <Row className="center" class="progress">
                    <ProgressBar
                        now={30}
                        label={`${30}%`}
                        animated
                        variant={variantState}
                    />
                </Row>
                <Row className="center">
                    <div className="content">
                        <DateTimer timerDuration={boiler.openDuration} />
                    </div>
                </Row>
                <Row className="center spaced">
                    <Button
                        type="button"
                        className="btn btn-danger btn-circle btn-lg"
                    >
                        30
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-warning btn-circle btn-lg"
                    >
                        15
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-primary btn-circle btn-lg"
                    >
                        5
                    </Button>
                </Row>
                <Row className="center spaced">
                    <DatePicker picker="time" onChange={onChange} />
                </Row>
                <Row className="center spaced">
                    <Button
                        className="button-space"
                        variant="danger"
                        onClick={() => updateBoiler(timeToSeconds(chosenTime))}
                    >
                        Start
                    </Button>
                    <Button className="button-space" variant="primary">
                        {boiler.open} - {boiler.openDuration}
                    </Button>
                </Row>
            </Container>
        )
    );
}

export default App;
