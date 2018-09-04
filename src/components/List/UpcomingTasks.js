import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Task from "./Task.js";

var date = moment(new Date()).format("YYYY-MM-DD");
var twoWeeks = moment()
  .add(1, "weeks")
  .format("YYYY-MM-DD");
// var date = new Date("MMM DD YYYY");

export default class UpcomingTasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    axios
      .post("/api/upcomingtasks", {
        todaysdate: date,
        twoweeks: twoWeeks
      })
      .then(results => {
        this.setState({ tasks: results.data });
        // console.log("results", results.data);
      });
    // console.log(date);
  }

  render() {
    // console.log(this.state.tasks);
    const taskItem = this.state.tasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          status={e.status}
          taskDate={e.task_date}
          cohortId={e.cohort_id}
          position={e.position}
        />
      );
    });
    return (
      <div>
        <div className="tbc_headline">
          <h1>Upcoming Tasks</h1>
        </div>
        {taskItem}
      </div>
    );
  }
}
