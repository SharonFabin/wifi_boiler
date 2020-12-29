import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import hot from "./resources/hot.gif";
import cold from "./resources/freeze.gif";
import reservationIcon from "./resources/reservation_icon.png";
import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import {
    Container,
    Button,
    Row,
    Col,
    Image,
    ProgressBar,
    Badge,
    Modal,
    ListGroup,
} from "react-bootstrap";
import DateTimer from "./components/DateTimer.js";
import {
    openBoiler,
    closeBoiler,
    scheduleBoiler,
    deleteReservation,
} from "./services/Api.js";
import { timeToSeconds } from "./services/TimeConverter.js";
import config from "./config/index.js";
import TimeRangePicker from "./components/TimeRangePicker";

function App() {
    const [boiler, setBoiler] = useState({
        open: false,
        openDuration: 0,
        lastOpened: 0,
        reservations: {},
    });
    const [listening, setListening] = useState(false);
    const [variantState, setVariant] = useState("primary");
    const [statusImage, setStatusImage] = useState(cold);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [stopTime, setStopTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const onChangeDate = (val) => {
        setDate(val);
    };
    const onChangeFromTime = (val) => {
        setStartTime(val);
    };
    const onChangeToTime = (val) => {
        setStopTime(val);
    };
    const requestBoilerChange = () => {
        if (startTime.getTime() === stopTime.getTime()) return;
        let startDate = new Date(date.getTime());
        let stopDate = new Date(date.getTime());
        startDate.setHours(startTime.getHours(), startTime.getMinutes());
        stopDate.setHours(stopTime.getHours(), stopTime.getMinutes());
        scheduleBoiler(startDate.getTime(), stopDate.getTime());
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!listening) {
            const events = new EventSource(
                `http://${config.web.ip}:${config.web.server_port}/boiler/events`
            );
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                setBoiler(parsedData);
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
            <Row className="center spaced">
                <Col className="center">
                    <div className="icon-space"></div>
                    <div className="date-timer">
                        <DateTimer
                            startTime={boiler.lastOpened}
                            timerDuration={boiler.openDuration}
                        />
                    </div>
                    <div className="icon-space">
                        <a onClick={handleShow}>
                            <Badge pill variant="secondary">
                                {Object.keys(boiler.reservations).length}
                            </Badge>
                            <span className="sr-only">unread messages</span>
                        </a>
                    </div>
                </Col>
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
                    onChangeDate={onChangeDate}
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
                    onClick={requestBoilerChange}
                >
                    לפתוח
                </Button>
            </Row>
            <Modal show={show} onHide={handleClose} centered className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Reservations</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        "max-height": "calc(100vh - 210px)",
                        "overflow-y": "auto",
                    }}
                >
                    <ListGroup>
                        {Object.keys(boiler.reservations).map((id) => (
                            <ListGroup.Item key={id} className="modal-list">
                                {new Date(
                                    boiler.reservations[id].openFrom
                                ).toLocaleString()}{" "}
                                →
                                {new Date(
                                    boiler.reservations[id].openTo
                                ).toLocaleTimeString()}
                                <Button
                                    variant="outline-danger"
                                    onClick={() => deleteReservation(id)}
                                >
                                    X
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default App;
