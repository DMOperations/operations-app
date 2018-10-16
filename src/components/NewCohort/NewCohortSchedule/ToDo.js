import React, { Component } from "react";
import "./ToDo.css";
import axios from "axios";

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editEmployee: false,
      editDate: false,
      editHeadline: false,
      employees: [],
      assignedEmployee: "",
      newDate: "",
      newHeadline: ""
    };
    this.updateEmployee = this.updateEmployee.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateHeadline = this.updateHeadline.bind(this);
  }

  componentDidMount() {
    axios.get("/api/getAllEmployees").then(response =>
      this.setState({
        employees: response.data
      })
    );
  }

  reassignEmployee = () => {
    this.setState({
      editEmployee: !this.state.editEmployee
    });
  };

  reassignDate = () => {
    this.setState({
      editDate: !this.state.editDate
    });
  };

  reassignHeadline = () => {
    this.setState({
      editHeadline: !this.state.editHeadline
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

  async updateHeadline(e) {
    await this.setState({
      newHeadline: e
    });
    axios.put("/api/reassignTaskHeadline", {
      id: this.props.id,
      newHeadline: this.state.newHeadline
    });
  }

  deleteTask = () => {
    axios.delete(`/api/deleteTask/${this.props.id}`);
  };

  render() {
    console.log(this.state.newDate);
    let date = this.props.taskDate.replace(/"/g, "");
    const employeeList = this.state.employees.map((e, i) => {
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
        {this.state.editHeadline ? (
          <input
            placeholder={this.props.taskHeadline}
            value={this.state.newHeadline}
            onChange={e => this.updateHeadline(e.target.value)}
          />
        ) : (
          <p onClick={this.reassignHeadline}> {this.props.taskHeadline} </p>
        )}

        {this.state.editEmployee ? (
          <div>
            <select name="assignedEmployee" onChange={this.updateEmployee}>
              {employeeList}
            </select>
          </div>
        ) : (
          <p onClick={this.reassignEmployee}>{this.props.position}</p>
        )}
        <button onClick={this.deleteTask}>&#128465;</button>
      </div>
    );
  }
}
