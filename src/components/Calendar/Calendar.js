import React, { Component } from "react";
import axios from "axios";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

export default class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      activies: []
    };
  }

  componentDidMount() {
    axios
      .get("/api/allTasks")
      .then(results => this.setState({ activies: results.data }));
  }

  render() {
    console.log(this.state);
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
    );
  }
}
