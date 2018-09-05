import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Task from "./Task.js";

var date = moment(new Date()).format("YYYY-MM-DD");
// var date = new Date("MMM DD YYYY");

export default class PastDueTasks extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      expand: true
    };
  }

  componentWillMount() {
    axios
      .post("/api/pastduetasks", {
        todaysdate: date
      })
      .then(results => {
        this.setState({ tasks: results.data });
        // console.log("results", results.data);
      });
    // console.log(date);
  }

  isOpen = () => {
    this.setState({
      expand: !this.state.expand
    });
    console.log(this.state.status);
  };

  render() {
    // console.log(this.state.tasks);
    const taskItem = this.state.tasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          taskDate={e.task_date}
          status={e.status}
          cohortId={e.cohort_id}
          position={e.position}
        />
      );
    });
    return (
      <Fragment>
        <div className="tbc_headline">
          <h1>Past Due Tasks</h1>
        </div>
        <div style={{ height: "40vh", overflow: "scroll" }}>
          {this.state.expand ? (
            <div>
              <button onClick={this.isOpen}>-</button>
              {taskItem}
            </div>
          ) : (
            <button onClick={this.isOpen}>+</button>
          )}
        </div>
      </Fragment>
    );
  }
}
