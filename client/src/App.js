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
    const [show, setShow] = useState(false);
    const onChangeFromTime = (val) => {
        setStartTime(val.getTime() / 1000);
    };
    const onChangeToTime = (val) => {
        setStopTime(val.getTime() / 1000);
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
                                9
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
            <Modal show={show} onHide={handleClose} centered className="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        "max-height": "calc(100vh - 210px)",
                        "overflow-y": "auto",
                    }}
                >
                    <ListGroup>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default App;
