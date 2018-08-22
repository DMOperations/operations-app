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
      cohortObj: "",
      startDate: "",
      breakDate: "",
      secondBreak: "",
      twoWeeks: false,
      dateAsKey: "",
      toNewSchedule: false
    };
    this.createCohort = this.createCohort.bind(this);
  }

  // componentDidMount() {
  //   this.datedToDo(defaultMapFile.dlPost);
  // }

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

  postNewCohort() {
    return axios
      .post(`/api/cohortId`, {
        cohortId: this.state.cohortId,
        startDate: this.state.startDate
      })
      .then(console.log("Eureka!!"));
  }

  postNewCohortObj() {
    return axios
      .post(`/api/insertactivities`, {
        cohortId: this.state.cohortId,
        cohortObj: this.state.dateAsKey
      })
      .then(console.log("Cohort Object", this.state.cohortObj));
  }

  createCohort() {
    this.datedToDo(defaultMapFile.dlPost);

    axios.all([this.postNewCohort(), this.postNewCohortObj()]).then(
      axios.spread(function(newCohort, newCohortObj) {
        // Both requests are now complete
        console.log("NewCohortObj", newCohortObj.data);
        this.setState(() => ({
          toNewSchedule: true
        }));
      })
    );
  }

  twoWeekBreak = () => {
    this.setState({
      twoWeeks: !this.state.twoWeeks
    });
  };

  //WE KNOW THIS ONE WORKS.

  datedToDo = postStart => {
    // const newObj = {};
    // for (const prop in postStart) {
    //   newObj[moment(new Date()).add(+prop, "days")] = postStart[prop];
    // }
    // this.setState({
    //   dateAsKey: newObj
    // });

    let cohortStart = moment(this.state.startDate);
    console.log("Start on state", this.state.startDate);
    console.log("Moment Cohort Start", cohortStart);
    const newObj = {};
    // .replace(/"/g, "");
    for (const prop in postStart) {
      // let jsonDate = JSON.stringify(
      //   moment(new Date())
      //     .startOf("day")
      //     .toDate()
      // ).split("T");
      newObj[
        JSON.stringify(
          moment(new Date(cohortStart))
            .add(+prop, "days")
            .format("MMM Do YYYY")
        )
      ] = postStart[prop];
    }
    // console.log(jsonDate[0].replace(/"/g, ""));
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
    console.log("DateAsKey", this.state.dateAsKey);
    // console.log("BREAK DATE", this.state.breakDate);
    // console.log("MOMENTS DATE", moment(this.state.breakDate, "MM-DD-YYYY"));
    const {
      cohortId,
      startDate,
      breakDate,
      secondBreak,
      toNewSchedule
    } = this.state;
    // if (this.state.toNewSchedule === true) {
    //   return <Redirect to={`/cohortschedule/${cohortId}`} />;
    // }

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
          {/* <NewCohortSchedule /> */}
        </div>
      </div>
    );
  }
}
