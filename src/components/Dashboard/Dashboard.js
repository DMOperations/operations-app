import React, { Component } from "react";
import "./Dashboard.css";
import List from "../List/List";
// import AssignNewTasks from "../AssignNewTasks/AssignNewTasks";
// import TasksByCohort from "../TasksByCohort/TasksByCohort";
// import UpcomingTasks from "../List/UpcomingTasks";
// import PastDueTasks from "../List/PastDueTasks";

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
        {/* <TasksByCohort /> */}
        {/* <PastDueTasks />
        <UpcomingTasks /> */}
        {/* <AssignNewTasks /> */}
      </div>
    );
  }
}

export default withRouter(Dashboard);
