import React, { Component } from "react";
import "./NavBar.css";
import DevMtnLogo from "./dvmtnlogo.png";
import { Link, withRouter } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nb_navbar nb_navbar_box  nb_links">
        <img src={DevMtnLogo} />
        <Link className="nb_links" to="/profile">
          <p>Profile</p>
        </Link>

        <Link className="nb_links" to="/dashboard">
          <p> Dashboard </p>
        </Link>

        <Link className="nb_links" to="/calendar">
          <p> Calendar </p>
        </Link>

        <Link className="nb_links" to="/newcohort">
          <p> New Cohort </p>
        </Link>
      </div>
    );
  }
}
