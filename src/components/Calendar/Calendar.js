import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      activies: [],
      select: "All"
    };
    this.handleCalendar = this.handleCalendar.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/allTasks")
      .then(results => this.setState({ activies: results.data }));
  }

  async handleCalendar(event) {
    await this.setState({ select: event.target.value });
    if (this.state.select == "All") {
      axios
        .get("/api/allTasks")
        .then(results => this.setState({ activies: results.data }));
    } else if (this.state.select == "One") {
      axios
        .get(`/api/allTasksByUser?user=${this.props.user.position}`)
        .then(results => this.setState({ activies: results.data }));
    }
  }

  render() {
    const activiesList = this.state.activies.map(e => {
      return {
        title: `
        ${e.task_headline} - ${e.cohort_id}`,
        start: e.task_date,
        id: e.id,
        color: "#" + e.cohort_color
      };
    });

    return (
      <div>
        <h1>Narrow it down:</h1>
        <div>
          <select value={this.state.select} onChange={this.handleCalendar}>
            <option value="All">All</option>
            <option value="One">Only Mine</option>
          </select>
        </div>
        <div className="calendar">
          <FullCalendar
            id="your-custom-ID"
            header={{
              left: "month,basicWeek,basicDay",
              center: "title",
              right: "today myCustomButton prev,next"
            }}
            defaultDate={new Date()}
            displayEventEnd={true}
            selectable={true}
            dragScroll={true}
            editable={true}
            eventTextColor="#000000"
            eventBorderColor="#e6e6e6"
            eventClick={function(calEvent, jsEvent, view) {
              alert("Event: " + calEvent.title);
            }}
            navLinks={true}
            eventLimit={true}
            events={activiesList}
            height={900}
            // theme="bootstrap3"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Calendar);
