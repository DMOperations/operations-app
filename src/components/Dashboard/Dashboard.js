import React, { Component } from "react";
import "./Dashboard.css";
import List from "../List/List";
import SideTaskMenu from "./SideTaskMenu/SideTaskMenu";
import routes from "../../routes.js";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="dash_with_task">
        <div className="dash_main">
          <Link to={`/addnewtask/${this.props.match.params.id}`}>
            Add New Task
          </Link>
          <div>
            <List />
          </div>
        </div>
        <SideTaskMenu />
      </div>
    );
  }
}

export default withRouter(Dashboard);
