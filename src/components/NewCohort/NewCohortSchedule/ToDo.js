import React from "react";
import "./ToDo.css";

export default function Todo(props) {
  let date = props.taskDate.replace(/"/g, "");

  return (
    <div className="schedule_task">
      <p>
        {" "}
        <div>{date}</div> <div>{props.taskHeadline}</div>
      </p>
    </div>
  );
}
