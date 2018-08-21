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
    console.log(this.state.expand);
    return (
      <div>
        {this.state.expand ? (
          <div className="task_expand">
            <h4>{this.props.task}</h4>
            <p>{this.props.taskbody}</p>
            <button className="task_expand_btn" onClick={this.isOpen}>
              +
            </button>
          </div>
        ) : (
          <div className="task">
            <h4>{this.props.task}</h4>
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
