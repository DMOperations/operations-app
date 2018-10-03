import React, { Component } from "react";
import "./ToDo.css";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editDate: false,
      employees: [],
      assignedEmployee: "",
      newDate: ""
    };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateDate = this.updateDate.bind(this);
  }

  reassign = () => {
    this.setState({
      edit: true
    });
  };

  reassignDate = () => {
    this.setState({
      editDate: true
    });
  };

  async updateEmployee(e) {
    await this.setState({
      assignedEmployee: e.target.value
    });
    axios.put("/api/reassignTask", {
      id: this.props.id,
      employee: this.state.assignedEmployee
    });
  }

  async updateDate(e) {
    await this.setState({
      newDate: e
    });
    axios.put("/api/reassignDate", {
      id: this.props.id,
      date: this.state.newDate
    });
  }

  deleteTask = () => {
    axios.delete(`/api/deleteTask/${this.props.id}`);
  };

  render() {
    console.log(this.state.newDate);
    let date = this.props.taskDate.replace(/"/g, "");
    const employeeList = this.props.employees.map((e, i) => {
      return <option value={e.username}>{e.username}</option>;
    });
    return (
      <div className="todo_box">
        {this.state.editDate ? (
          <input
            type="date"
            placeholder="YYYY-MM-DD"
            value={this.state.newDate}
            onChange={e => this.updateDate(e.target.value)}
          />
        ) : (
          <div onClick={this.reassignDate} className="date">
            {date}
          </div>
        )}
        <p> {this.props.taskHeadline} </p>

        {this.state.edit ? (
          <div>
            <select name="assignedEmployee" onChange={this.updateEmployee}>
              {employeeList}
            </select>
          </div>
        ) : (
          <p onClick={this.reassign}>{this.props.position}</p>
        )}
        <button onClick={this.deleteTask}>&#128465;</button>
      </div>
    );
  }
}
