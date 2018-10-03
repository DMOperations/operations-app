import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import defaultMapFile from "../../utils/defaultMapFile";
import NewCohortSchedule from "./NewCohortSchedule/NewCohortSchedule";
import routes from "../../routes.js";
import { withRouter, Redirect } from "react-router-dom";
import "./NewCohort.css";

export default class NewCohort extends Component {
  constructor() {
    super();

    this.state = {
      cohortId: "",
      cohortObj: "",
      cohortObjPre: "",
      startDate: "",
      breakDate: "",
      secondBreak: "",
      twoWeeks: false,
      dateAsKey: "",
      dateAsKeyPre: "",
      toNewSchedule: false,
      cohortColor: "",
      cohortCampus: ""
    };
    this.postNewCohort = this.postNewCohort.bind(this);
    this.postNewCohortObj = this.postNewCohortObj.bind(this);
  }

  componentWillMount() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    this.setState({
      cohortColor: randomColor
    });
  }

  datedToDo = postStart => {
    let cohortStart = moment(this.state.startDate);
    const newObj = {};

    for (const prop in postStart) {
      newObj[
        moment(new Date(cohortStart))
          .add(+prop, "days")
          .format("YYYY-MM-DD")
      ] = postStart[prop];
    }
    this.setState({
      dateAsKey: newObj
    });
    console.log(this.state.dateAsKey);
  };

  datedToDoPre = preStart => {
    let cohortStart = moment(this.state.startDate);
    const newObj = {};

    for (const prop in preStart) {
      newObj[
        moment(new Date(cohortStart))
          .subtract(+prop, "days")
          .format("YYYY-MM-DD")
      ] = preStart[prop];
    }
    this.setState({
      dateAsKeyPre: newObj
    });
    console.log(this.state.dateAsKeyPre);
  };

  updateCohortName(value) {
    this.setState({
      cohortId: value
    });
  }
  updateCohortCampus(value) {
    this.setState({
      cohortCampus: value
    });
  }

  updateCohortStart(value) {
    this.setState({
      startDate: value,
      breakDate: moment(this.state.startDate, "YYYY-MM-DD").add(7, "weeks")
    });
  }

  postNewCohort() {
    axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate,
        cohortColor: this.state.cohortColor,
        cohortCampus: this.state.cohortCampus
      })
      .then(
        this.datedToDoPre(defaultMapFile.dlPre),
        this.datedToDo(defaultMapFile.dlPost)
      );
  }

  toSchedFunc() {
    this.setState({
      toNewSchedule: true
    });
  }

  postNewCohortPre() {
    return axios.post(`/api/insertactivitiespre`, {
      cohortId: this.state.cohortId,
      cohortObjPre: this.state.dateAsKeyPre
    });
  }

  postNewCohortPost() {
    return axios.post(`/api/insertactivities`, {
      cohortId: this.state.cohortId,
      cohortObj: this.state.dateAsKey
    });
  }

  postNewCohortObj() {
    axios
      .all([this.postNewCohortPost(), this.postNewCohortPre()])
      .then(axios.spread(this.toSchedFunc()));
  }

  // twoWeekBreak = () => {
  //   this.setState({
  //     twoWeeks: !this.state.twoWeeks
  //   });
  // };

  render() {
    // console.log("props", this.props);
    console.log("State", this.state);
    if (this.state.toNewSchedule === true) {
      return <Redirect to={`/cohortschedule/${this.state.cohortId}`} />;
    }
    const {
      cohortId,
      startDate,
      breakDate,
      secondBreak,
      toNewSchedule,
      cohortCampus
    } = this.state;

    let styles = {
      backgroundColor: "#" + this.state.cohortColor
    };

    console.log(styles);

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
            <h2>Cohort Campus</h2>
            <select
              name="cohortCampus"
              onChange={e => this.updateCohortCampus(e.target.value)}
            >
              <option selected disabled>
                Select
              </option>
              <option value="Provo">Provo</option>
              <option value="Salt Lake City">Salt Lake City</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Dallas">Dallas</option>
            </select>
            <h2>Start Date</h2>
            <input
              type="date"
              placeholder="MM DD YYYY"
              value={startDate}
              onChange={e => this.updateCohortStart(e.target.value)}
            />
            <div style={styles}>Cohort Color</div>
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
