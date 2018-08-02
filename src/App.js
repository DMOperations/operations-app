import React, { Component } from "react";
import List from "./components/List";
import NavBar from "./components/NavBar";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <List />
      </div>
    );
  }
}

export default App;
