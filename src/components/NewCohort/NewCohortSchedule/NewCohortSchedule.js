import React, { Component } from "react";
import axios from "axios";
import defaultMapFile from "../../../utils/defaultMapFile";
import Todo from "./ToDo";

export default class NewCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preStart: [],
      postStart: []
    };
  }

  componentWillMount() {
    this.setState({
      preStart: defaultMapFile.dlPre,
      postStart: defaultMapFile.dlPost
    });
  }

  render() {
    // console.log("PRE", this.state.preStart);
    console.log("POST", this.state.postStart[1]);
    // const list = this.state.postStart.map((e, i) => {
    //   return <Todo key={i} taskHeadline={e.taskHeadline} status={e.status} />;
    // });
    return (
      <div>
        <button onClick={this.loadSchedule}> Create Schedule</button>
        {/* {list} */}
      </div>
    );
  }
}
