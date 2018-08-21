import React, { Component } from "react";
import axios from "axios";
import defaultMapFile from "../../../utils/defaultMapFile";
import Todo from "./ToDo";
import moment from "moment";

export default class NewCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateAsKey: ""
    };
  }
  componentDidMount() {
    this.datedToDo(defaultMapFile.dlPost);
  }

  datedToDo = postStart => {
    const newObj = {};
    const jsonDate = JSON.stringify(
      moment()
        .startOf("day")
        .toDate()
    );
    for (const prop in postStart) {
      newObj[moment(new Date()).add(+prop, "days")] = postStart[prop];
    }
    console.log(jsonDate);
    this.setState({
      dateAsKey: newObj
    });
  };

  render() {
    // const list = this.state.postStart.map((e, i) => {
    //   return <Todo key={i} taskHeadline={e.taskHeadline} status={e.status} />;
    // });
    // console.log(this.state.dateAsKey);
    // console.log(this.props);
    return (
      <div>
        {/* <button onClick={this.loadSchedule}> Create Schedule</button> */}
      </div>
    );
  }
}
