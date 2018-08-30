import React, { Component } from "react";
import "./Task.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      checkValue: false
    };
    this.isOpen = this.isOpen.bind(this);
  }

  componentDidMount() {
    let checkVal = JSON.parse(this.props.status);
    let statusParsed = JSON.parse(this.props.status);
    this.setState({
      checkValue: checkVal
    });
  }

  checkFunc() {
    console.log("roger");
    this.setState({
      checkValue: true
    });
  }

  isOpen() {
    this.setState({
      expand: !this.state.expand
    });
  }

  render() {
    // console.log(this.props);
    // console.log(this.state);

    return (
      <div>
        {this.state.expand ? (
          <div className="task_expand">
            <p>
              {this.props.cohortId} - {this.props.task} - {this.props.position}
            </p>
            <p>
              <input
                type="checkbox"
                checked={this.state.checkValue}
                onClick={this.state.checkFunc}
              />
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
              {this.props.cohortId} - {this.props.task} - {this.props.position}
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
