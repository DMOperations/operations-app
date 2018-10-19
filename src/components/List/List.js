import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import Task from "./Task.js";
import "./List.css";

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
    axios
      .get(`/api/tasks?todaysdate=${date}&position=${this.props.user.position}`)
      .then(results => this.setState({ tasks: results.data }));
    axios
      .get(
        `/api/pastduetasks?todaysdate=${date}&position=${
          this.props.user.position
        }`
      )
      .then(results => {
        this.setState({ pastDueTasks: results.data });
      });

    axios
      .get(
        `/api/upcomingtasks?todaysdate=${tomorrow}&twoweeks=${twoWeeks}&position=${
          this.props.user.position
        }`
      )
      .then(results => {
        this.setState({ upcomingTasks: results.data });
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
        .then(results => this.setState({ tasks: results.data }));
      axios
        .get(
          `/api/pastduetasks?todaysdate=${date}&position=${
            this.props.user.position
          }`
        )
        .then(results => {
          this.setState({ pastDueTasks: results.data });
        });

      axios
        .get(
          `/api/upcomingtasks?todaysdate=${tomorrow}&twoweeks=${twoWeeks}&position=${
            this.props.user.position
          }`
        )
        .then(results => {
          this.setState({ upcomingTasks: results.data });
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
      <div className="task_views">
        {this.state.expandToday ? (
          <div className="tbc_headline" onClick={this.todayIsOpen}>
            <h1>Today's Tasks</h1>
            <div className="plusMinus">+</div>
          </div>
        ) : (
          <div>
            <div className="tbc_headline" onClick={this.todayIsOpen}>
              <h1 className=".tbc_headline_h1">Today's Tasks</h1>
              <div className="plusMinus">-</div>
            </div>
            <div className="tasks_list">{taskItem}</div>
          </div>
        )}
        {this.state.expandUpcoming ? (
          <div className="tbc_headline" onClick={this.upcomingIsOpen}>
            <h1 className=".tbc_headline_h1">Upcoming Tasks</h1>
            <div className="plusMinus">+</div>
            {/* <div className="tasks_list" /> */}
          </div>
        ) : (
          <div>
            <div className="tbc_headline" onClick={this.upcomingIsOpen}>
              <h1 className=".tbc_headline_h1">Upcoming Tasks</h1>
              <div className="plusMinus">-</div>
            </div>
            <div className="tasks_list">{upComingTaskItem}</div>
          </div>
        )}
        {this.state.expandPast ? (
          <div className="tbc_headline" onClick={this.pastIsOpen}>
            <h1 className=".tbc_headline_h1">Past Due Tasks</h1>
            <div className="plusMinus">+</div>
          </div>
        ) : (
          <div>
            <div className="tbc_headline" onClick={this.pastIsOpen}>
              <h1 className=".tbc_headline_h1">Past Due Tasks</h1>
              <div className="plusMinus">-</div>
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
