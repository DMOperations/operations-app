import React, { Component } from "react";
import "./Dashboard.css";
import List from "../List/List";
import routes from "../../routes.js";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="dash_main">
        <Link to={`/addnewtask/${this.props.match.params.id}`}>
          Add New Task
        </Link>
        <div>
          <List />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
