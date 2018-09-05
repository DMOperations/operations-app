import React, { Component, Fragment } from "react";
import Moment from "react-moment";
import moment from "moment";
import axios from "axios";
import Task from "./Task.js";

var date = moment(new Date()).format("YYYY-MM-DD");
var twoWeeks = moment()
  .add(1, "weeks")
  .format("YYYY-MM-DD");
// var date = new Date("MMM DD YYYY");

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      upcomingTasks: [],
      pastDueTasks: [],
      dateForQuery: "",
      expand: true
    };
  }

  componentWillMount() {
    axios
      .post("/api/tasks", {
        todaysdate: date
      })
      .then(
        results => this.setState({ tasks: results.data })
        // console.log(results)
      );

    axios
      .post("/api/pastduetasks", {
        todaysdate: date
      })
      .then(results => {
        this.setState({ pastDueTasks: results.data });
        // console.log("results", results.data);
      });

    axios
      .post("/api/upcomingtasks", {
        todaysdate: date,
        twoweeks: twoWeeks
      })
      .then(results => {
        this.setState({ upcomingTasks: results.data });
        // console.log("results", results.data);
      });
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
          id={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          taskDate={e.task_date}
          status={e.status}
          cohortId={e.cohort_id}
          position={e.position}
        />
      );
    });

    const upComingTaskItem = this.state.upcomingTasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          id={e.id}
          task={e.task_headline}
          taskbody={e.task_body}
          taskDate={e.task_date}
          status={e.status}
          cohortId={e.cohort_id}
          position={e.position}
        />
      );
    });

    const pastDueTaskItem = this.state.pastDueTasks.map((e, i) => {
      return (
        <Task
          key={e.id}
          id={e.id}
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
      <div style={{ height: "80vh" }}>
        <div className="tbc_headline">
          <h1>Today's Tasks:</h1>
          {taskItem}
        </div>
        <div className="tbc_headline">
          <h1>Past Due Tasks</h1>
          {pastDueTaskItem}
        </div>
        <div className="tbc_headline">
          <h1>Upcoming Tasks</h1>
          {upComingTaskItem}
        </div>
      </div>
      // <Fragment>
      //   <div className="tbc_headline">
      //     <div>
      //       <h1>Today's Tasks</h1>
      //     </div>
      //   </div>
      //   <div style={{ height: "40vh", overflow: "scroll" }}>
      //     {this.state.expand ? (
      //       <div>
      //         <button onClick={this.isOpen}>-</button>
      //         {taskItem}
      //       </div>
      //     ) : (
      //       <button onClick={this.isOpen}>+</button>
      //     )}
      //   </div>
      // </Fragment>
    );
  }
}
