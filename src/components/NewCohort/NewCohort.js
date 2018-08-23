import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import defaultMapFile from "../../utils/defaultMapFile";
import NewCohortSchedule from "./NewCohortSchedule/NewCohortSchedule";
import routes from "../../routes.js";
import { withRouter } from "react-router-dom";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      cohortObj: "",
      startDate: "",
      breakDate: "",
      secondBreak: "",
      twoWeeks: false,
      dateAsKey: "",
      toNewSchedule: false
    };
    this.postNewCohort = this.postNewCohort.bind(this);
    this.postNewCohortObj = this.postNewCohortObj.bind(this);
  }

  datedToDo = postStart => {
    let cohortStart = moment(this.state.startDate);
    const newObj = {};

    for (const prop in postStart) {
      newObj[
        JSON.stringify(
          moment(new Date(cohortStart))
            .add(+prop, "days")
            .format("MMM Do YYYY")
        )
      ] = postStart[prop];
    }
    this.setState({
      dateAsKey: newObj
    });
    console.log(this.state.dateAsKey);
  };

  updateCohortName(value) {
    this.setState({ cohortId: value });
  }

  updateCohortStart(value) {
    this.setState({
      startDate: value,
      breakDate: moment(this.state.startDate, "YYYY-MM-DD").add(7, "weeks")
    });
  }

  // this.datedToDo(defaultMapFile.dlPost);

  postNewCohort() {
    axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate
      })
      .then(this.datedToDo(defaultMapFile.dlPost));
  }

  postNewCohortObj() {
    axios
      .post(`/api/insertactivities`, {
        cohortId: this.state.cohortId,
        cohortObj: this.state.dateAsKey
      })
      .then(() => this.props.history.push("/dashboard"));
  }

  twoWeekBreak = () => {
    this.setState({
      twoWeeks: !this.state.twoWeeks
    });
  };

  render() {
    const {
      cohortId,
      startDate,
      breakDate,
      secondBreak,
      toNewSchedule
    } = this.state;

    console.log(toNewSchedule);
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
            <h2>Start Date</h2>
            <input
              type="date"
              placeholder="MM DD YYYY"
              value={startDate}
              onChange={e => this.updateCohortStart(e.target.value)}
            />
            <button onClick={this.postNewCohort}>Confirm</button>
            <h2>Interim Week:</h2>
            <Moment parse="YYYY-MM-DD" format="MMMM DD YYYY" add={{ weeks: 6 }}>
              {this.state.startDate}
            </Moment>
            {/* Do you have a different interim week?
            <input
              type="date"
              placeholder="MM DD YYYY"
              value={breakDate}
              onChange={e => this.updateBreak(e.target.value)}
            />
            Is this break two weeks long?
            <input
              type="checkbox"
              checked={this.state.twoWeeks}
              onChange={this.twoWeekBreak}
            />
            Do you have more than one Interim Week?
            <input
              type="date"
              placeholder="MM DD YYYY"
              value={secondBreak}
              onChange={e => this.updateSecondBreak(e.target.value)}
            /> */}
            <button onClick={this.postNewCohortObj}>Create </button>
          </div>
        </div>
      </div>
    );
  }
}
