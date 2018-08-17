import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import defaultMapFile from "../../utils/defaultMapFile";
import NewCohortSchedule from "./NewCohortSchedule/NewCohortSchedule";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      startDate: "",
      breakDate: "",
      secondBreak: "",
      twoWeeks: false,
      dateAsKey: ""
    };
    this.createCohort = this.createCohort.bind(this);
  }

  componentDidMount() {
    this.datedToDo(defaultMapFile.dlPost);
  }

  updateCohortName(value) {
    this.setState({ cohortId: value });
  }

  updateCohortStart(value) {
    this.setState({
      startDate: value,
      breakDate: moment(this.state.startDate, "YYYY-MM-DD").add(7, "weeks")
    });
  }

  // updateBreak(value) {
  //   this.setState({
  //     breakDate: moment(value, "MM-DD-YYYY")
  //   });
  // }

  // updateSecondBreak(value) {
  //   this.setState({
  //     secondBreak: value
  //   });
  // }

  createCohort() {
    axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate
      })
      .then(console.log("Eureka!!"));
  }

  twoWeekBreak = () => {
    this.setState({
      twoWeeks: !this.state.twoWeeks
    });
  };

  //WE KNOW THIS ONE WORKS.

  datedToDo = postStart => {
    const newObj = {};
    for (const prop in postStart) {
      newObj[moment(new Date()).add(+prop, "days")] = postStart[prop];
    }
    this.setState({
      dateAsKey: newObj
    });
  };

  //JUST LEAVE THIS LITTLE NUGGET HERE.

  // datedToDo = postStart => {
  //   const newObj = {};
  //   // let date = moment(new Date(), "MM-DD-YYYY");
  //   for (const prop in postStart) {
  //     if (
  //       moment(this.state.breakDate, "MM-DD-YYYY").diff(
  //         moment(new Date(), "MM-DD-YYYY"),
  //         "days"
  //       ) <= 1
  //     ) {
  //       newObj[moment(new Date(), "MM-DD-YYYY").add(+prop, "days")] =
  //         postStart[prop];
  //     } else if (
  //       moment(this.state.breakDate, "MM-DD-YYYY").diff(
  //         moment(new Date(), "MM-DD-YYYY"),
  //         "days"
  //       ) >= 1
  //     ) {
  //       newObj[moment(new Date(), "MM-DD-YYYY").add(+prop + 7, "days")] =
  //         postStart[prop];
  //     }
  //   }
  //   this.setState({
  //     dateAsKey: newObj
  //   });
  // };

  render() {
    console.log(this.state.dateAsKey);
    console.log("BREAK DATE", this.state.breakDate);
    console.log("MOMENTS DATE", moment(this.state.breakDate, "MM-DD-YYYY"));
    const { cohortId, startDate, breakDate, secondBreak } = this.state;

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
            <button onClick={this.createCohort}>Next</button>
          </div>
          <NewCohortSchedule />
        </div>
      </div>
    );
  }
}
