import React, { Component } from "react";
import axios from "axios";
import Task from "./Task.js";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/tasks")
      .then(results => this.setState({ tasks: results.data }));
  }

  render() {
    const taskItem = this.state.tasks.map((e, i) => {
      return <Task key={e.to_do_id} week={e.week} day={e.day} task={e.task} />;
    });
    return (
      <div>
        <h1>All Tasks</h1>
        {taskItem}
      </div>
    );
  }
}
