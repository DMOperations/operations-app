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

  //function that calculates current week relative to cohortStartDate

  render() {
    const cohort = this.state.activeCohorts.map((e, i) => {
      return (
        <CohortList
          key={e.cohort_id}
          id={e.cohort_id}
          cohortStart={e.start_date}
        />
      );
    });
    return <div className="tbc_cohort_list">{cohort}</div>;
  }
}
