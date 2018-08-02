import React, { Component } from "react";
import TBC from "./TasksByCohort.css";

export default class TasksByCohort extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="tbc_headline">
          <h1> Upcoming Tasks</h1>
        </div>
      </div>
    );
  }
}
