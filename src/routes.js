import React from "react";
import { Switch, Route } from "react-router-dom";

import App from "./App";
import AssignNewTasks from "./components/AssignNewTasks/AssignNewTasks";
import Calendar from "./components/Calendar/Calendar";
import Dashboard from "./components/Dashboard/Dashboard";
import List from "./components/List/List";
import NewCohort from "./components/NewCohort/NewCohort";
import Profile from "./components/Profile/Profile";
import TasksByCohort from "./components/TasksByCohort/TasksByCohort";

export default (
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/assign" component={AssignNewTasks} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/list" component={List} />
    <Route path="/newcohort" component={NewCohort} />
    <Route path="/profile" component={Profile} />
    <Route path="/tasksbycohort" component={TasksByCohort} />
  </Switch>
);
