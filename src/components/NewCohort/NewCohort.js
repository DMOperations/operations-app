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
    console.log(this.state.startDate);
  }

  updateBreak(value) {
    this.setState({
      breakDate: value
    });
  }

  updateSecondBreak(value) {
    this.setState({
      secondBreak: value
    });
  }

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

  // datedToDo = postStart => {
  //   const newObj = {};
  //   for (const prop in postStart) {
  //     newObj[moment(new Date()).add(+prop, "days")] = postStart[prop];
  //   }
  //   this.setState({
  //     dateAsKey: newObj
  //   });
  // };

  datedToDo = postStart => {
    const newObj = {};
    const { breakDate } = this.state;
    let date = moment(new Date());
    for (const prop in postStart) {
      if (moment(breakDate).diff(date, "days") <= 1) {
        newObj[moment(new Date()).add(+prop, "days")] = postStart[prop];
      } else if (moment(breakDate).diff(date, "days") >= 1) {
        newObj[moment(new Date()).add(+prop + 7, "days")] = postStart[prop];
      }
    }
    this.setState({
      dateAsKey: newObj
    });
  };

  render() {
    console.log(this.state);
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
            Do you have a different interim week?
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
            />
            <button onClick={this.createCohort}>Next</button>
          </div>
          <NewCohortSchedule />
        </div>
      </div>
    );
  }
}
