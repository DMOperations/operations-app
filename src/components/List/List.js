import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import Task from "./Task.js";

var date = moment(new Date()).format("YYYY-MM-DD");
var tomorrow = moment(new Date())
  .add(1, "days")
  .format("YYYY-MM-DD");
var twoWeeks = moment()
  .add(1, "weeks")
  .format("YYYY-MM-DD");
// var date = new Date("MMM DD YYYY");

class List extends Component {
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

  componentDidMount() {
    console.log(this.props.user.position);
    axios
      .get(`/api/tasks?todaysdate=${date}&position=${this.props.user.position}`)
      .then(
        results => this.setState({ tasks: results.data })
        // console.log(results)
      );
    axios
      .get(
        `/api/pastduetasks?todaysdate=${date}&position=${
          this.props.user.position
        }`
      )
      .then(results => {
        this.setState({ pastDueTasks: results.data });
        console.log("results", results.data);
      });

    axios
      .get(
        `/api/upcomingtasks?todaysdate=${tomorrow}&twoweeks=${twoWeeks}&position=${
          this.props.user.position
        }`
      )
      .then(results => {
        this.setState({ upcomingTasks: results.data });
        // console.log("results", results.data);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.user &&
      this.props.user.position &&
      this.props.user.user_id !== prevProps.user.user_id
    ) {
      axios
        .get(
          `/api/tasks?todaysdate=${date}&position=${this.props.user.position}`
        )
        .then(
          results => this.setState({ tasks: results.data })
          // console.log(results)
        );
      axios
        .get(
          `/api/pastduetasks?todaysdate=${date}&position=${
            this.props.user.position
          }`
        )
        .then(results => {
          this.setState({ pastDueTasks: results.data });
          console.log("results", results.data);
        });

      axios
        .get(
          `/api/upcomingtasks?todaysdate=${tomorrow}&twoweeks=${twoWeeks}&position=${
            this.props.user.position
          }`
        )
        .then(results => {
          this.setState({ upcomingTasks: results.data });
          // console.log("results", results.data);
        });
    }
  }

  isOpen = () => {
    this.setState({
      expand: !this.state.expand
    });
    console.log(this.state.status);
  };

  render() {
    console.log("TASKS", this.state);
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
          <h1>Today's Tasks</h1>
          {taskItem}
        </div>
        <div className="tbc_headline">
          <h1>Upcoming Tasks</h1>
          {upComingTaskItem}
        </div>
        <div className="tbc_headline">
          <h1>Past Due Tasks</h1>
          {pastDueTaskItem}
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(List);
