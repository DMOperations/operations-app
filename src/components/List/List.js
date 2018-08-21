import React, { Component } from "react";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Task from "./Task.js";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    var date = moment()
      .startOf("day")
      .toDate();
    // var date = JSON.stringify(date);

    axios
      .get("/api/tasks", { date: date })
      .then(results => this.setState({ tasks: results.data }));
  }

  render() {
    console.log(this.state.tasks);
    const taskItem = this.state.tasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          status={e.status}
        />
      );
    });
    return (
      <div>
        <div className="tbc_headline">
          <h1>All Tasks</h1>
        </div>
        {taskItem}
      </div>
    );
  }
}
