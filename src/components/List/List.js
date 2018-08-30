import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Task from "./Task.js";

var date = moment(new Date()).format("YYYY-MM-DD");
// var date = new Date("MMM DD YYYY");

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      dateForQuery: ""
    };
  }

  // setDate() {
  //   JSON.stringify(
  //     moment(new Date(this.state.dateForQuery)).format("MMM Do YYYY")
  //   );
  // }

  componentWillMount() {
    axios
      .post("/api/tasks", {
        todaysdate: date
      })
      .then(
        results => this.setState({ tasks: results.data })
        // console.log(results)
      );

  }

  render() {
    // console.log(this.state.tasks);
    const taskItem = this.state.tasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          id={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          status={e.status}
          cohortId={e.cohort_id}
          position={e.position}
        />
      );
    });
    return (
      <div>
        <div className="tbc_headline">
          <h1>Today's Tasks</h1>
        </div>
        {taskItem}
      </div>
    );
  }
}
