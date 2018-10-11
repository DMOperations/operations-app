import React, { Component } from "react";
import "./CohortList.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import Moment from "react-moment";

export default class CohortList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDate: ""
    };
  }

  render() {
    console.log(`"${this.props.cohortStart}"`);
    return (
      <div className="cohort_labels">
        <div>
          <div className="cohort_name">
            <Link to={`/cohortschedule/${this.props.id}`}>{this.props.id}</Link>
          </div>
          <div>
            Week
            <Moment
              parse="YYYY-MM-DD"
              diff={this.props.cohortStart}
              unit="weeks"
              add={{ weeks: 1 }}
            >
              {moment()}
            </Moment>
          </div>
        </div>
      </div>
    );
  }
}
