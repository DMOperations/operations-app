import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const CohortList = props => {
  // handleClick(e) {
  //   e.preventDefault();
  //   this.props.history.push(`/cohortschedule/${activeCohorts[cohort_id]}`);
  // }

  return (
    <div className="task">
      <p />

      <Link to={`/cohortschedule/${props.id}`}>{props.id}</Link>
    </div>
  );
};

export default CohortList;
