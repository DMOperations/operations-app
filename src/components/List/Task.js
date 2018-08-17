import React from "react";
import "./Task.css";

const Task = props => {
  return (
    <div className="task">
      <p>{props.task}</p>
    </div>
  );
};

export default Task;
