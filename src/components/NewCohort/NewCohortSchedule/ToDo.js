import React, { Component } from "react";
import "./ToDo.css";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      employees: "string"
    };
  }

  reassign = () => {
    this.setState({
      edit: true
    });
  };

  render() {
    let date = this.props.taskDate.replace(/"/g, "");
    const employeeList = this.props.employees.map((e, i) => {
      return <option>{e.username}</option>;
    });
    return (
      <div className="todo_box">
        <div className="date"> {date} </div>
        <p> {this.props.taskHeadline} </p>
        <p>{this.props.position}</p>
        {this.state.edit ? (
          <div>
            <select>{employeeList}</select>
          </div>
        ) : (
          <button onClick={this.reassign}>Reassign</button>
        )}
      </div>
    );
  }
}
