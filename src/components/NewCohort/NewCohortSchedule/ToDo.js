import React, { Component } from "react";
import "./ToDo.css";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      employees: "string",
      assignedEmployee: ""
    };
    this.updateEmployee = this.updateEmployee.bind(this);
  }

  reassign = () => {
    this.setState({
      edit: true
    });
  };

  //SLIGHT ISSUES WITH THIS
  async updateEmployee(e) {
    await this.setState({
      assignedEmployee: e.target.value
    });
    axios.put("/api/reassignTask", {
      id: this.props.id,
      employee: this.state.assignedEmployee
    });
  }

  render() {
    let date = this.props.taskDate.replace(/"/g, "");
    const employeeList = this.props.employees.map((e, i) => {
      return <option value={e.username}>{e.username}</option>;
    });
    return (
      <div className="todo_box">
        <div className="date"> {date} </div>
        <p> {this.props.taskHeadline} </p>
        <p>{this.props.position}</p>
        {this.state.edit ? (
          <div>
            <select name="assignedEmployee" onChange={this.updateEmployee}>
              {employeeList}
            </select>
          </div>
        ) : (
          <button onClick={this.reassign}>Reassign</button>
        )}
      </div>
    );
  }
}
