import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import routes from "./routes";
import { connect } from "react-redux";
import { getUser } from "./ducks/reducer";

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="wrapitgood">
          <NavBar />

          <div className="body_position_rel">{routes}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(App);
