import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { sideTask, getTask } from "../../ducks/reducer";
import moment from "moment";
import Moment from "react-moment";
import Checkbox from "@material-ui/core/Checkbox";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
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
    this.props.sideTask();
    this.props.getTask(this.props.id);
  };

  render() {
    // console.log("TASK PROPS", this.props);
    // let taskDateFormatted = moment(this.props.taskDate, "MMM Do YYYY");

    return (
      <div className="task" onClick={this.openSide}>
        <div>
          <Checkbox
            checked={this.state.status}
            onClick={this.updateStatus}
            value={this.state.status}
            color="primary"
          />
        </div>
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
  { sideTask, getTask }
)(Task);
