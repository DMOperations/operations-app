import React, { Component } from "react";
import ToDo from "./ToDo";
import axios from "axios";

export default class NewCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cohortId: []
    };
  }

  componentDidMount() {
    // const { id } = ;
    console.log(this.props);
    let paramsId = this.props.match.params.id;

    axios.post(`/api/getAllTasksByCohort/`, { paramsId }).then(response => {
      console.log(response);
      this.setState({ cohortId: response.data });
    });

    console.log("this is working");
  }

  render() {
    // console.log(this.props);
    const cohortTasks = this.state.cohortId.map((e, i) => {
      return (
        <ToDo
          key={e.id}
          taskHeadline={e.task_headline}
          taskDate={e.task_date}
        />
      );
    });
    return (
      <div>
        {" "}
        NewCohortSchedule
        {cohortTasks}
      </div>
    );
  }
}
