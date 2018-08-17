import React, { Component } from "react";
import axios from "axios";
import CohortList from "./CohortList/CohortList";
import "./TasksByCohort.css";

export default class TasksByCohort extends Component {
  constructor() {
    super();
    this.state = {
      activeCohorts: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/getActiveCohorts")
      .then(results => this.setState({ activeCohorts: results.data }));
  }

  render() {
    console.log(this.state.activeCohorts);
    const cohort = this.state.activeCohorts.map((e, i) => {
      return <CohortList key={e.cohort_id} id={e.cohort_id} />;
    });
    return (
      <div>
        <div className="tbc_headline">
          <h1> Current Cohorts</h1>
        </div>
        {cohort}
      </div>
    );
  }
}
