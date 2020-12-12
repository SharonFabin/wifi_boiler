import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import hot from "./resources/hot.gif";
import cold from "./resources/freeze.gif";
import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import {
    Jumbotron,
    Container,
    Button,
    Row,
    Col,
    Image,
    ProgressBar,
} from "react-bootstrap";
import DateTimer from "./components/DateTimer.js";
import { updateBoiler } from "./services/Api.js";
import { timeToSeconds } from "./services/TimeConverter.js";

function App() {
    const [boiler, setBoiler] = useState({ open: false, openDuration: 0 });
    const [listening, setListening] = useState(false);
    const [variantState, setVariant] = useState("primary");
    const [chosenTime, setChosenTime] = useState("00:00:00");
    const onChange = (date, dateString) => {
        setChosenTime(dateString);
    };

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
        <Container className="p-3 bg">
            <Row className="center">
                <Image src={cold} rounded className="status-image" />
            </Row>
            <Row className="center progress">
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
    );
}

export default App;
