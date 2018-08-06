import React, { Component } from "react";
import axios from "axios";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      startDate: ""
    };

    // assign values to state
    // on submit, post to DB
  }
  updateCohortName(value) {
    this.setState({ cohortId: value });
  }

  createCohort(cohortId) {
    axios.post(`/api/cohortId`).then(results => {
      this.setState({
        cohortId: results.data
      });
    });
  }

  render() {
    const { cohortId } = this.state;

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
            <h2>Start Date</h2> <input />
            <button onClick={this.createCohort}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}
