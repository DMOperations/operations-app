import React, { Component } from "react";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      position: "",
      campus: ""
    };
  }

  update = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        Update Profile:
        <div>
          Position:
          <select name="position" onChange={this.update}>
            <option value="Campus Director">Campus Director</option>
            <option value="Student Success">Student Success</option>
            <option value="Office Manager">Office Manager</option>
          </select>
        </div>
        <div>
          Campus:
          <select name="campus" onChange={this.update}>
            <option value="Provo">Provo</option>
            <option value="Salt Lake City">Salt Late City</option>
            <option value="Pheonix">Pheonix</option>
            <option value="Dallas">Dallas</option>
          </select>
        </div>
      </div>
    );
  }
}
