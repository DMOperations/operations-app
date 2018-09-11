import React, { Component } from "react";
import dateFns from "date-fns";

export default class Calendar extends Component {
  constructor() {
    super();

    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }

  renderHeader() {}

  renderDays() {}

  renderCells() {}

  onDateClick = day => {};

  nextMonth = () => {};

  prevMonth = () => {};

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}
