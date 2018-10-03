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
      expandToday: false,
      expandUpcoming: false,
      expandPast: false
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

  todayIsOpen = () => {
    this.setState({
      expandToday: !this.state.expandToday
    });
  };

  upcomingIsOpen = () => {
    this.setState({
      expandUpcoming: !this.state.expandUpcoming
    });
  };

  pastIsOpen = () => {
    this.setState({
      expandPast: !this.state.expandPast
    });
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
        {this.state.expandToday ? (
          <div className="tbc_headline">
            <h1 onClick={this.todayIsOpen}>Today's Tasks</h1>
          </div>
        ) : (
          <div>
            <div className="tbc_headline">
              <h1 onClick={this.todayIsOpen}>Today's Tasks</h1>
            </div>
            {taskItem}
          </div>
        )}
        {this.state.expandUpcoming ? (
          <div className="tbc_headline">
            <h1 onClick={this.upcomingIsOpen}>Upcoming Tasks</h1>
          </div>
        ) : (
          <div>
            <div className="tbc_headline">
              <h1 onClick={this.upcomingIsOpen}>Upcoming Tasks</h1>
            </div>
            {upComingTaskItem}
          </div>
        )}
        {this.state.expandPast ? (
          <div className="tbc_headline">
            <h1 onClick={this.pastIsOpen}>Past Due Tasks</h1>
          </div>
        ) : (
          <div>
            <div className="tbc_headline">
              <h1 onClick={this.pastIsOpen}>Past Due Tasks</h1>
            </div>
            {pastDueTaskItem}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(List);
