import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

import routes from "./routes";
import { Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <div className="wrapitgood">
          <NavBar />

          <div className="body_position_rel">{routes}</div>
        </div>
      </div>
    );
  }
}

export default App;
