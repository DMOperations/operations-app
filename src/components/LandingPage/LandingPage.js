import React, { Component } from "react";
import WideLogo from "./WideBlueBlack.png";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing_page">
        <img src={WideLogo} />
        <a href="http://localhost:4000/login">LOGIN</a>
      </div>
    );
  }
}
