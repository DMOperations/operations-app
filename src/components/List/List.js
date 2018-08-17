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

  componentWillMount() {
    axios
      .get("/api/tasks")
      .then(results => this.setState({ tasks: results.data }));
  }

  render() {
    console.log(this.state.tasks);
    const taskItem = this.state.tasks.map((e, i) => {
      return <Task key={e.to_do_id} task={e.task} />;
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
