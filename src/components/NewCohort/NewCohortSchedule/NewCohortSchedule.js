import React, { Component } from "react";
import "./NewCohortSchedule.css";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ToDo from "./ToDo";
import axios from "axios";
import "./NewCohortSchedule.css";
import Moment from "../../../../node_modules/react-moment";

class NewCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohortId: [],
      employees: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let paramsId = this.props.match.params.id;
      axios
        .post(`/api/getAllTasksByCohort/`, { paramsId })
        .then(
          response =>
            console.log(response) || this.setState({ cohortId: response.data })
        );
      axios.get("/api/getAllEmployees").then(response =>
        this.setState({
          employees: response.data
        })
      );
    }
  }

  componentDidMount() {
    let paramsId = this.props.match.params.id;
    axios
      .post(`/api/getAllTasksByCohort/`, { paramsId })
      .then(
        response =>
          console.log(response) || this.setState({ cohortId: response.data })
      );
    axios.get("/api/getAllEmployees").then(response =>
      this.setState({
        employees: response.data
      })
    );
  }

  render() {
    console.log(this.state.cohortId);
    const cohortTasks = this.state.cohortId.map((e, i) => {
      return (
        <ToDo
          key={e.id}
          id={e.id}
          taskHeadline={e.task_headline}
          taskDate={e.task_date}
          position={e.position}
          employees={this.state.employees}
          // adminLevel={this.props.user.admin_level}
        />
      );
    });
    return (
      <div className="schedule">
        <div className="cohort_schedule_outline">
          <h1>Cohort Schedule for {this.props.match.params.id}</h1>
          <Link to={`/addnewtask/${this.props.match.params.id}`}>
            Add New Task
          </Link>
        </div>
        <div className="cohort_task_list">{cohortTasks}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewCohort);
