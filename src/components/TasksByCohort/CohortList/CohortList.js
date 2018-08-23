import React, { Component } from "react";
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
    return (
      <div className="task">
        <p />
        <div>
          <Link to={`/cohortschedule/${this.props.id}`}>{this.props.id}</Link>
        </div>
        <br />
        {/* <div> - Start Date: {this.props.cohortStart}</div> */}
        <div>
          <p>Current week: </p>
          <Moment parse="YYYY-MM-DD" diff={this.props.cohortStart} unit="weeks">
            {moment()}
          </Moment>
        </div>
      </div>
    );
  }
}
