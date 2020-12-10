import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import hot from "./resources/hot.gif";
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TimerInput from "./components/timer-input.js";

import "./App.css";

// class App extends React.Component {
//     render() {
//         return (
//             <Container className="p-3">
//                 <Jumbotron>
//                     <img src={hot} />
//                     <TimerInput name="meow" />
//                 </Jumbotron>
//             </Container>
//         );
//     }
// }

function App() {
    const [nests, setNests] = useState([]);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (!listening) {
            const events = new EventSource(
                "http://localhost:3000/boiler/events"
            );
            events.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);

                setNests((nests) => nests.concat(parsedData));
            };

            setListening(true);
        }
    }, [listening, nests]);

    return (
        <table className="stats-table">
            <thead>
                <tr>
                    <th>Momma</th>
                    <th>Eggs</th>
                    <th>Temperature</th>
                </tr>
            </thead>
            <tbody>
                {nests.map((nest, i) => (
                    <tr key={i}>
                        <td>{nest.momma}</td>
                        <td>{nest.eggs}</td>
                        <td>{nest.temperature} ℃</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default App;
