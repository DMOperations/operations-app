import React, { Component } from "react";

export default class LandingPage extends Component {
  loginHandle = () => {
    (window.location.href = "http://localhost:4000/login").then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.loginHandle}>Login</button>
      </div>
    );
  }
}
