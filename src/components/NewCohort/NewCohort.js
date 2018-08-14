import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";

import NewCohortSchedule from "./NewCohortSchedule/NewCohortSchedule";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      startDate: ""
    };
    this.createCohort = this.createCohort.bind(this);

    // assign values to state
    // on submit, post to DB
  }
  updateCohortName(value) {
    this.setState({ cohortId: value });
  }

  updateCohortStart(value) {
    this.setState({
      startDate: value,
      breakDate: moment(this.state.startDate, "YYYY-MM-DD").add(7, "weeks")
    });
    console.log(this.state.startDate);
  }

  createCohort() {
    axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate
      })
      .then(console.log("Eureka!!"));
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() {
    const { cohortId, startDate } = this.state;

    return (
      <div>
        <div className="NC_card">
          <div className="title_line">
            <h1>New Cohort</h1>
          </div>
          <div className="NC_Box">
            <h2>Cohort Name</h2>
            <input
              placeholder="Cohort Name"
              value={cohortId}
              onChange={e => this.updateCohortName(e.target.value)}
            />
            <h2>Start Date</h2>{" "}
            <input
              type="date"
              placeholder="MM DD YYYY"
              value={startDate}
              onChange={e => this.updateCohortStart(e.target.value)}
            />
            <h2>Interim Week:</h2>
            <Moment parse="YYYY-MM-DD" format="MMMM DD YYYY" add={{ weeks: 6 }}>
              {this.state.startDate}{" "}
            </Moment>
            <button onClick={this.createCohort}>Next</button>
          </div>
          <NewCohortSchedule startDate={this.state.startDate} />
        </div>
      </div>
    );
  }
}
