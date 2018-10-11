import React, { Component } from "react";
import "./Dashboard.css";
import List from "../List/List";
import SideTaskMenu from "./SideTaskMenu/SideTaskMenu";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {this.props.sideTask ? (
          <div className="dash_with_task">
            <div className="dash_main_task">
              <Link to={`/addnewtask/${this.props.match.params.id}`}>
                Add New Task
              </Link>
              <div>
                <List />
              </div>
            </div>
            <SideTaskMenu />
          </div>
        ) : (
          <div className="dash_main">
            <Link to={`/addnewtask/${this.props.match.params.id}`}>
              Add New Task
            </Link>
            <div>
              <List />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(Dashboard));
