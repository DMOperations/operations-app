import React from "react";

export default function Todo(props) {
  console.log(props);
  return (
    <div>
      <p> {props.taskHeadline} </p>
      <p> {props.status} </p>
    </div>
  );
}
