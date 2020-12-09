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

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import TimeInput from "react-time-input";

import "./App.css";

const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(true);

    return (
        <div>
            {!show && (
                <Button onClick={() => toggleShow(true)}>Show Toast</Button>
            )}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">React-Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </div>
    );
};

const App = () => (
    <Container className="p-3">
        <Jumbotron>
            <h1 className="header">Welcome To React-Bootstrap</h1>
            <ExampleToast>
                We now have Toasts
                <span role="img" aria-label="tada">
                    🎉
                </span>
            </ExampleToast>
        </Jumbotron>
    </Container>
);

export default App;
