import React from "react";

import './ToDo.css'


export default function Todo(props) {
  let date = props.taskDate.replace(/"/g, "");

  return (
    <div className="todo_box">
      <div className='date'> {date} </div>
      <p> {props.taskHeadline} </p>
    </div>
  );
}
