import React, { Component } from "react";
import "./SideTaskMenu.css";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";
const moment = require("moment");

class SideTaskMenu extends Component {
  constructor() {
    super();
    this.state = {
      sideTask: [],
      addComment: "",
      comments: []
    };
  }

  componentDidMount() {
    // axios.get(`/api/getSingleTask/${this.props.singleTask.id}`).then(response =>
    //   this.setState({
    //     sideTask: response.data
    //   })
    // );
    // axios.get(`/api/getComments/${this.props.singleTask.id}`).then(response => {
    //   this.setState({
    //     comments: response.data
    //   });
    // });
  }

  addComment = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postComment = e => {
    axios
      .post("/api/addComment", {
        task: this.props.singleTask[0].id,
        comment: this.state.addComment,
        user: this.props.user.user_id,
        date: new Date()
      })
      .then(response => {
        this.setState({
          addComment: "",
          comments: response.data
        });
      });
  };

  render() {
    console.log(this.props);
    const sideTask = this.props.singleTask.map((e, i) => {
      return (
        <div key={i} className="task_information">
          <div className="side_date">
            <Moment parse={"YYYY-MM-DD"} format={"MMMM Do YYYY"}>
              {e.task_date}
            </Moment>
          </div>
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
          <h3>{e.task_headline}</h3>
          <p>{e.task_body}</p>
        </div>
      );
    });

    const comments = this.state.comments.map((e, i) => {
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
        {sideTask}
        <h3>Comments</h3>
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

export default connect(mapStateToProps)(SideTaskMenu);
