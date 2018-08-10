import React, { Component } from "react";
import List from "../List/List";
import AssignNewTasks from "../AssignNewTasks/AssignNewTasks";
import TasksByCohort from "../TasksByCohort/TasksByCohort";

import routes from "../../routes.js";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <List />
        <TasksByCohort />
        <AssignNewTasks />
      </div>
    );
  }
}

export default withRouter(Dashboard);
