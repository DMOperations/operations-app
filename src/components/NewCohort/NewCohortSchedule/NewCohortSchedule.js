import React, { Component } from "react";
import "./NewCohortSchedule.css";
import { connect } from "react-redux";
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

  // array.sort(callback return value ) moment.isbefore

  componentDidMount() {
    // const { id } = ;
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

  //.sort((a, b) => moment(a.date).isBefore(moment(b.date))

  render() {
    const cohortTasks = this.state.cohortId.map((e, i) => {
      return (
        <ToDo
          key={e.id}
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
        </div>
        <div className="cohort_task_list">{cohortTasks}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewCohort);
