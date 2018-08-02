import React, { Component } from "react";
import List from "../List/List";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <List />
      </div>
    );
  }
}

export default Dashboard;
