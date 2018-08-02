import React, { Component } from "react";
import NavBar from "./NavBar.css";

import routes from "../../routes.js";
import { Link } from "react-router-dom";

export default class List extends Component {
  render() {
    return (
      <div className="nb_navbar nb_navbar_box  nb_links">
        <p>Menu</p>

        <Link className="nb_links" to="/">
          <p> Home </p>
        </Link>

        <Link className="nb_links" to="/dashboard">
          <p> Dashboard </p>
        </Link>

        {/* <Link className="nb_links" to="/list">
          <p> To Do List </p>
        </Link> */}

        {/* <Link className="nb_links" to="/assign">
          <p> Assign Tasks </p>
        </Link> */}

        <Link className="nb_links" to="/calendar">
          <p> Calendar </p>
        </Link>

        <Link className="nb_links" to="/newcohort">
          <p> New Cohort </p>
        </Link>

        <Link className="nb_links" to="/profile">
          <p> Profile </p>
        </Link>

        {/* <Link className="nb_links" to="/tasksbycohort">
          <p> Tasks By Cohort </p>
        </Link> */}
      </div>
    );
  }
}
