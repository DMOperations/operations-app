import React, { Component } from "react";
import "./SideTaskMenu.css";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";

class SideTaskMenu extends Component {
  constructor() {
    super();
    this.state = {
      sideTask: [],
      addComment: ""
    };
  }

  componentDidMount() {
    axios.get(`/api/getSingleTask/${8167}`).then(response =>
      this.setState({
        sideTask: response.data
      })
    );
  }

  addComment = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  postComment = e => {
    axios.post("/api/addComment", {
      task: this.state.sideTask[0].id,
      comment: this.state.addComment,
      user: this.props.user.user_id
    });
  };

  render() {
    console.log(this.props);
    const sideTask = this.state.sideTask.map((e, i) => {
      return (
        <div key={i} className="task_information">
          <div classname="side_date">
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
    return (
      <div className="side_task_menu">
        {sideTask}
        <div className="comment">
          <textarea
            name="addComment"
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
