import React from "react";
import ReactDOM from "react-dom";
import "./App.css";

let Greet = () => <h1>Hello, world!</h1>;

ReactDOM.render(React.createElement(Greet), document.getElementById("app"));
