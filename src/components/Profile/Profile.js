import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";

class Profile extends Component {
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
    console.log(this.props.user);
    return (
      <div classname="profile">
        <h1>
          {this.props.user.username}
          's Settings:
        </h1>
        <img src={this.props.user.picture} />
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
