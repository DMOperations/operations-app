import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { getUser } from "./ducks/reducer";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.user, this.props.user);
    if (prevProps.user !== this.props.user) {
      window.location.href = "/#/dashboard";
    }
  }

  render() {
    return (
      <div className="App">
        <div className="nav_container">
          {this.props.user ? <NavBar /> : null}
        </div>
        <div className="route_container">{routes}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(
    mapStateToProps,
    { getUser }
  )(App)
);
