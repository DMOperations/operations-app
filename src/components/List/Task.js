import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { sideTask, getTask, getComments } from "../../ducks/reducer";
import Moment from "react-moment";
import Checkbox from "@material-ui/core/Checkbox";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false
    };
  }

  updateStatus = () => {
    axios
      .put("/api/updateStatus", {
        id: this.props.id,
        status: !this.state.status
      })
      .then(
        this.setState({
          status: !this.state.status
        })
      );
    console.log(this.state.status);
  };

  openSide = () => {
    this.props.getTask(this.props.id);
    this.props.getComments(this.props.id);
    this.props.sideTask();
  };

  render() {
    return (
      <div className="task" onClick={this.openSide}>
        <div className="task_checkbox">
          <Checkbox
            checked={this.state.status}
            onClick={this.updateStatus}
            value={this.state.status}
            color="primary"
            style={{
              padding: 0
            }}
          />
        </div>
        <div className="task_cohort">{this.props.cohortId}</div>
        <div className="task_headline">{this.props.task}</div>

        <div className="task_date">
          <Moment parse={"YYYY-MM-DD"} format={"MMMM Do YYYY"}>
            {this.props.taskDate}
          </Moment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { sideTask, getTask, getComments }
)(Task);
