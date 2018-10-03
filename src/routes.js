import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Calendar from "./components/Calendar/Calendar";
import Dashboard from "./components/Dashboard/Dashboard";
import List from "./components/List/List";
import NewCohort from "./components/NewCohort/NewCohort";
import Profile from "./components/Profile/Profile";
import TasksByCohort from "./components/TasksByCohort/TasksByCohort";
import NewCohortSchedule from "./components/NewCohort/NewCohortSchedule/NewCohortSchedule";
import AddNewTask from "./components/NewCohort/AddNewTask/AddNewTask";

export default (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/calendar" component={Calendar} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/list" component={List} />
    <Route path="/newcohort" component={NewCohort} />
    <Route path="/profile" component={Profile} />
    <Route path="/tasksbycohort" component={TasksByCohort} />
    <Route path="/cohortschedule/:id" component={NewCohortSchedule} />
    <Route path="/addnewtask/:id" component={AddNewTask} />
  </Switch>
);
