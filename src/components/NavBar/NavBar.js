import React, { Component } from "react";
import "./NavBar.css";
import DevMtnLogo from "./dvmtnlogo.png";
import { Link, withRouter } from "react-router-dom";
import TasksByCohort from "../TasksByCohort/TasksByCohort";

export default class NavBar extends Component {
  render() {
    return (
      <div className="nb_navbar nb_navbar_box  nb_links">
        <div>
          <img src={DevMtnLogo} />
        </div>
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
        <div className="nb_cohorts">
          <TasksByCohort />
        </div>
      </div>
    );
  }
}
