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

  render() {
    return (
      <div className="App">
        {this.props.user ? <NavBar /> : null}
        <div>{routes}</div>
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
