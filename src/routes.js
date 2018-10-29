/****** SOME OF THIS Courtesy Of Steven Isbell https://www.github.com/steven-isbell ******/
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Calendar from "./components/Calendar/Calendar";
import Dashboard from "./components/Dashboard/Dashboard";
import List from "./components/List/List";
import NewCohort from "./components/NewCohort/NewCohort";
import ProfileHook from "./components/Profile/ProfileHook";
import TasksByCohort from "./components/TasksByCohort/TasksByCohort";
import NewCohortSchedule from "./components/NewCohort/NewCohortSchedule/NewCohortSchedule";
import AddNewTask from "./components/NewCohort/AddNewTask/AddNewTask";

const Routes = ({ user }) => (
  <Switch>
    <Route
      exact
      path="/"
      render={() =>
        user && user.user_id ? <Redirect to="/dashboard" /> : <LandingPage />
      }
    />
    {user && user.user_id ? (
      <Switch>
        <Route path="/calendar" component={Calendar} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/list" component={List} />
        <Route path="/newcohort" component={NewCohort} />
        <Route path="/profile" component={ProfileHook} />
        <Route path="/tasksbycohort" component={TasksByCohort} />
        <Route path="/cohortschedule/:id" component={NewCohortSchedule} />
        <Route path="/addnewtask/:id" component={AddNewTask} />
      </Switch>
    ) : (
      <Redirect to="/" />
    )}
    />
  </Switch>
);

export default Routes;
/****** Courtesy Of Steven Isbell https://www.github.com/steven-isbell ******/
