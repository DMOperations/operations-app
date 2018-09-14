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
        ${e.task_headline}`,

        start: e.task_date,
        id: e.id
      };
    });

    return (
      <div className="calendar">
        <FullCalendar
          id="your-custom-ID"
          header={{
            left: "prev,next today myCustomButton",
            center: "title",
            right: "basicWeek,basicDay"
          }}
          defaultDate={new Date()}
          displayEventEnd={true}
          selectable={true}
          dragScroll={true}
          editable={true}
          eventColor="transparent"
          eventTextColor="#000000"
          eventBorderColor="#e6e6e6"
          eventClick={function(calEvent, jsEvent, view) {
            alert("Event: " + calEvent.title);
          }}
          navLinks={true}
          eventLimit={true}
          events={activiesList}
        />
      </div>
    );
  }
}
