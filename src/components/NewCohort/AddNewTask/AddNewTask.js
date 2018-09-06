import React, { Component } from "react";
import "./AddNewTask.css";
import axios from "axios";

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

  postNewTask = e => {
    axios
      .post("/api/addNewTask", {
        date: this.state.date,
        body: this.state.body,
        headline: this.state.headline,
        position: this.state.position,
        cohortId: this.props.match.params.id
      })
      .then(console.log("done"));
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
        <select name="position" onChange={this.newTask}>
          <option value="Campus Director">Campus Director</option>
          <option value="Student Success">Student Success</option>
          <option value="Office Manager">Office Manager</option>
        </select>
        <div>
          <button onClick={this.postNewTask}>Submit</button>
        </div>
      </div>
    );
  }
}

export default AddNewTask;
