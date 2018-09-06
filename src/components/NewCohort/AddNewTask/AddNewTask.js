import React, { Component } from "react";
import "./AddNewTask.css";

class AddNewTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headline: "",
      body: "",
      date: "",
      position: ""
    };
  }

  newTask = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.state);
    const { headline, body, date, position } = this.state;
    return (
      <div>
        <h1>Add New Task</h1>
        <h2>Task Headline</h2>
        <input name="headline" value={headline} onChange={this.newTask} />
        <h2>Task Body</h2>
        <input name="body" value={body} onChange={this.newTask} />
        <h2>Task Date</h2>
        <input type="date" value={date} name="date" onChange={this.newTask} />
        <h2>Position</h2>
        <input name="position" value={position} onChange={this.newTask} />
      </div>
    );
  }
}

export default AddNewTask;
