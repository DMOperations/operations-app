import React, { Component } from "react";
import axios from "axios";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      startDate: "",
      breakDate: ""
    };
    this.createCohort = this.createCohort.bind(this);
    // assign values to state
    // on submit, post to DB
  }
  updateCohortName(value) {
    this.setState({ cohortId: value });
  }

  updateCohortStart(value) {
    this.setState({ startDate: value });
  }

  updateBreakStart(value) {
    this.setState({ breakDate: value });
  }

  createCohort() {
    axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate,
        breakDate: this.state.breakDate
      })
      .then(console.log("Eureka!!"));
  }

  render() {
    const { cohortId, startDate, breakDate } = this.state;

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
              placeholder="Cohort Start Date"
              value={startDate}
              onChange={e => this.updateCohortStart(e.target.value)}
            />
            <h2>Interim Week</h2>{" "}
            <input
              placeholder="Interim Week"
              value={breakDate}
              onChange={e => this.updateBreakStart(e.target.value)}
            />
            <button onClick={this.createCohort}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}
