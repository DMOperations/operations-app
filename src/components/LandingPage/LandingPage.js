import React, { Component } from "react";
import WideLogo from "./WideBlueBlack.png";
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <div className='landing_background'>
        <div className="landing_page">
          <img src={WideLogo} />
          <h1>Operations Checklist</h1>
          <a href="http://localhost:4000/login">LOGIN</a>
        </div>
      </div>
    );
  }
}
