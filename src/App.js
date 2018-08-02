import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

import routes from "./routes";
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
  }

  loginHandle = () => {
    (window.location.href = "http://localhost:4000/login").then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div className="App">
        <div className="wrapitgood">
          <NavBar />

          <div className="body_position_rel">{routes}</div>
          <button onClick={this.loginHandle}>Login</button>
        </div>
      </div>
    );
  }
}

export default App;
