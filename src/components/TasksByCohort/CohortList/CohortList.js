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
        <div>
          <p>
            <Link to={`/cohortschedule/${this.props.id}`}>{this.props.id}</Link>{" "}
            - Week{" "}
            <Moment
              parse="YYYY-MM-DD"
              diff={this.props.cohortStart}
              unit="weeks"
              add={{ weeks: 1 }}
            >
              {moment()}
            </Moment>{" "}
          </p>
        </div>
      </div>
    );
  }
}
