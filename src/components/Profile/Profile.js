import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      position: "Campus Director",
      campus: "Provo"
    };
  }

  update = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitProfile = e => {
    axios.put("/api/profile", {
      id: this.props.user.user_id,
      position: this.state.position,
      campus: this.state.campus
    });
    // .then((window.location.href = "http:localhost:3000/dashboard"));
  };

  render() {
    return (
      <div className="profile">
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
            <option value="Salt Lake City">Salt Lake City</option>
            <option value="Pheonix">Phoenix</option>
            <option value="Dallas">Dallas</option>
          </select>
        </div>
        <button onClick={this.submitProfile}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
