import React from "react";

export default function Todo(props) {
  let date = props.taskDate.replace(/"/g, "");

  return (
    <div>
      <p> {props.taskHeadline} </p>
      <p> {date} </p>
    </div>
  );
}
