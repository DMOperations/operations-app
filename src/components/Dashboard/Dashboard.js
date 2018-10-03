import React, { Component } from "react";
import "./Dashboard.css";
import List from "../List/List";
import routes from "../../routes.js";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="dash_main">
        <div>
          <List />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
