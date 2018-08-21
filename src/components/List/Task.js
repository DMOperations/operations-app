import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
    this.isOpen = this.isOpen.bind(this);
  }

  isOpen() {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        {this.state.expand ? (
          <div className="task_expand">
            <p>{this.props.task}</p>
            <p>{this.props.taskbody}</p>
            <p>{this.props.status}</p>
            <button className="task_expand_btn" onClick={this.isOpen}>
              -
            </button>
          </div>
        ) : (
          <div className="task">
            <p>{this.props.task}</p>
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
