import React, { Component } from "react";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar-reactwrapper/dist/css/fullcalendar.min.css";

export default class Calendar extends Component {
  constructor() {
    super();
  }

  render() {
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
          // defaultView={"basicWeek"}
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
          navLinks={true} // can click day/week names to navigate views
          eventLimit={true} // allow "more" link when too many events
          // events={clsList}
        />
      </div>
    );
  }
}
