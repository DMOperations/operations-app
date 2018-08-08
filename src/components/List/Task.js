import React from "react";
import "./Task.css";

const Task = props => {
  return (
    <div className="task">
      <p>Week: {props.week}</p>
      <p>Day: {props.day}</p>
      <p>Task: {props.task}</p>
    </div>
  );
};

export default Task;
