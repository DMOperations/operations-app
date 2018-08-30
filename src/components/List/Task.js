import React, { Component } from "react";
import axios from "axios";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      status: false
    };
  }

  isOpen = () => {
    this.setState({
      expand: !this.state.expand
    });
    console.log(this.state.status);
  };

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

  render() {
    // console.log(this.props);

    return (
      <div>
        {this.state.expand ? (
          <div className="task_expand">
            <p>
              {this.props.cohortId} - {this.props.task} - {this.props.position}
            </p>
            <p>
              <input name="done" type="checkbox" onClick={this.updateStatus} />
              {this.props.taskbody}
            </p>

            <p />

            <button className="task_expand_btn" onClick={this.isOpen}>
              -
            </button>
          </div>
        ) : (
          <div className="task">
            <p>
              {this.props.cohortId} - {this.props.task} - {this.props.position}{" "}
              - {this.props.taskDate}
            </p>
            <button className="task_expand_btn" onClick={this.isOpen}>
              +
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Task;
