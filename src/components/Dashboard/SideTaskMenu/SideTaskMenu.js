import React, { Component } from "react";
import "./SideTaskMenu.css";
import { connect } from "react-redux";
import { postComment, sideTaskExit } from "../../../ducks/reducer";
import axios from "axios";
import Moment from "react-moment";
const moment = require("moment");

class SideTaskMenu extends Component {
  constructor() {
    super();
    this.state = {
      sideTask: [],
      addComment: "",
      comments: [],
      status: false
    };
  }

  // componentDidUpdate() {
  //   this.setState({
  //     status: false
  //   });
  // }

  updateStatus = () => {
    console.log(this.props.singleTask[0].id, this.state.status);
    axios
      .put("/api/updateStatus", {
        id: this.props.singleTask[0].id,
        status: !this.state.status
      })
      .then(
        this.setState({
          status: !this.state.status
        })
      );
  };

  addComment = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postComment = e => {
    this.props
      .postComment({
        task: this.props.singleTask[0].id,
        comment: this.state.addComment,
        user: this.props.user.user_id,
        date: new Date()
      })
      .then(
        this.setState({
          addComment: ""
        })
      );
  };

  render() {
    console.log(this.props);
    const sideTask = this.props.singleTask.map((e, i) => {
      return (
        <div key={i} className="task_information">
          <div className="cohort_information">
            <div className="cohort_id">
              Cohort
              <div>{e.cohort_id}</div>
            </div>
            <div className="cohort_id">
              Position
              <div>{e.position}</div>
            </div>
          </div>
          <h3 className="side_date">
            <Moment parse={"YYYY-MM-DD"} format={"MMMM Do YYYY"}>
              {e.task_date}
            </Moment>
          </h3>
          <h2 className="side_headline">{e.task_headline}</h2>
          <p>{e.task_body}</p>
        </div>
      );
    });

    const comments = this.props.comments.map((e, i) => {
      var relativeDate = moment(e.comment_date).fromNow();

      return (
        <div className="individual_comments" key={i}>
          <div className="image_cropper">
            <img src={e.picture} />
          </div>
          <div className="comment_text">
            <p>{e.comment_text}</p>
            <p className="relative_time">{relativeDate}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="side_task_menu">
        <div className="side_task_buttons">
          <button onClick={this.updateStatus}>
            {this.state.status ? "Completed" : "Mark Complete"}
          </button>
          <button onClick={this.props.sideTaskExit}>X</button>
        </div>
        {sideTask}
        <h3 className="comment_title">Comments</h3>
        <div className="comment_list">{comments}</div>
        <div className="comment">
          <textarea
            name="addComment"
            value={this.state.addComment}
            onChange={this.addComment}
            placeholder="Write a comment.."
          />
          <button onClick={this.postComment}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { postComment, sideTaskExit }
)(SideTaskMenu);
