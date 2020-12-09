// import hot from "./resources/hot.gif";
// import Button from "react-bootstrap/Button";
// import "./App.css";

// function meow() {
//     alert("hi");
// }

// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 <img src={hot} className="App-logo" alt="logo" />
//             </header>
//             <Button variant="primary">Primary</Button>
//         </div>
//     );
// }

// export default App;
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import hot from "./resources/hot.gif";
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TimerInput from "./components/timer-input.js";

import "./App.css";

const App = () => (
    <Container className="p-3">
        <header>
            <img src={hot} />
            <TimerInput name="meow" />
        </header>
    </Container>
);

export default App;
