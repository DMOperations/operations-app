import React, { Component } from "react";
import './NewCohortSchedule.css';
import ToDo from "./ToDo";
import axios from "axios";
import "./NewCohortSchedule.css";

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

    axios
      .post(`/api/getAllTasksByCohort/`, { paramsId })
      .then(
        response =>
          console.log(response) || this.setState({ cohortId: response.data })
      );
  }

  render() {
    // console.log(this.props);
    const cohortTasks = this.state.cohortId.map((e, i) => {
      return (
        <ToDo
          key={e.id}
          taskHeadline={e.task_headline}
          taskDate={e.task_date}
          // className="task"
        />
      );
    });
    return (
      <div className="schedule">
        <div className='cohort_schedule_outline'>
          <h1>Cohort Schedule for {this.props.match.params.id}</h1>
        </div>
        <div className='cohort_task_list'>
          {cohortTasks}
        </div>
      </div>
    );
  }
}
