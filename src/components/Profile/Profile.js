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
        <div className="profile_top">
          <img src={this.props.user.picture} className="profileCircle" />
          <div className="profile_right">
            <div className="username">{this.props.user.username}</div>
            <div className="data_container">
              <div>
                {this.props.user.position}
                <select name="position" onChange={this.update}>
                  <option selected disabled>
                    Position
                  </option>
                  <option value="Campus Director">Campus Director</option>
                  <option value="Student Success">Student Success</option>
                  <option value="Office Manager">Office Manager</option>
                </select>
              </div>

              <div>
                {this.props.user.campus}
                <select name="campus" onChange={this.update}>
                  <option selected disabled>
                    Campus
                  </option>
                  <option value="Provo">Provo</option>
                  <option value="Salt Lake City">Salt Lake City</option>
                  <option value="Pheonix">Phoenix</option>
                  <option value="Dallas">Dallas</option>
                </select>
              </div>

              <button onClick={this.submitProfile}>Submit</button>
            </div>
          </div>
        </div>
        <div>
          <div className="stats_container">
            <h1>Number of Tasks Completed</h1>
            <h1>Active Cohorts</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Profile);
