import React, { Component } from "react";
import axios from "axios";
import defaultMapFile from "../../../utils/defaultMapFile";
import Todo from "./ToDo";

export default class NewCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfTasks: []
    };

    this.loadSchedule = this.loadSchedule.bind(this);
  }

  loadSchedule() {
    this.setState({
      listOfTasks: JSON.parse(JSON.stringify(defaultMapFile.dlPre))
    });
    console.log(this.state.listOfTasks);
  }

  render() {
    let list = this.state.listOfTasks.map(function(element, index) {
      return (
        <Todo key={index} task={element.taskHeadline}>
          {element}
        </Todo>
      );
    });
    return (
      <div>
        <button onClick={this.loadSchedule}> Create Schedule</button>
        {/* {list} */}
        {list}
      </div>
    );
  }
}
