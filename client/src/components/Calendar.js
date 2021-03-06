import React, { Component } from 'react'
import moment from 'moment';
import './Calendar.css';
import Modal from "./Modal";
import { addReminder } from './UserFunctions';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

class Calendar extends Component {
    state = {
        reminder: '',
        start_date: '',
        end_date: '',
        frequency: 'Monthly',
        next_date: '',
        isShowing: false,
        errors: {},
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null,
        data: []
    }

    constructor(props) {
        super(props);
        this.width = props.width || "350px";
        this.style = props.style || {};
        this.style.width = this.width; // add this
    }



    weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday"]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onNextMonth && this.props.onNextMonth();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({
            dateContext: dateContext
        });
        this.props.onPrevMonth && this.props.onPrevMonth();
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e) => { this.onSelectChange(e, data) }}>
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e) => { this.onChangeMonth(e, this.month()) }}>
                {this.month()}
                {this.state.showMonthPopup &&
                    <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setYear(e.target.value);
            this.setState({
                showYearNav: false
            })
        }
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
                <input
                    defaultValue={this.year()}
                    className="editor-year"
                    ref={(yearInput) => { this.yearInput = yearInput }}
                    onKeyUp={(e) => this.onKeyUpYear(e)}
                    onChange={(e) => this.onYearChange(e)}
                    type="number"
                    placeholder="year" />
                :
                <span
                    className="label-year"
                    onDoubleClick={(e) => { this.showYearEditor() }}>
                    {this.year()}
                </span>
        );
    }

    onDayClick = (e, day) => {
        this.setState({
            selectedDay: day
        }, () => {
            console.log("SELECTED DAY: ", this.state.selectedDay);
        });

        this.props.onDayClick && this.props.onDayClick(e, day);
    }

    onChange = (e) => {
        console.log('e.target.name', e.target.name)
        console.log('e.target.value', e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newReminder = {
            reminder: this.state.reminder,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            next_date: this.state.next_date,
            frequency: this.state.frequency,
            address: this.state.address
        }

        console.log({ newReminder })

        addReminder(newReminder).then(res => {
            this.props.history.push('/calendar');
            this.fetchReminders();
        });
    }

    openModalHandler = () => {
        this.setState({ isShowing: true });
    }

    closeModalHandler = () => {
        this.setState({ isShowing: false });
    }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({ 
            email: decoded.email,
            role: decoded.role
        })

        axios.get(`/reminders/reminderList?role=${decoded.role}&email=${decoded.email}`).then((res) => {
            console.log(res.data.data);
            this.setState({data: res.data.data})
        })

        this.fetchReminders()
    }

    fetchReminders() {
         const token = localStorage.usertoken;
         const decoded = jwt_decode(token);
             axios
               .get(
                 `/reminders/reminderList?role=${decoded.role}&email=${decoded.email}`
               )
               .then(res => {
                 console.log(res.data.data);
                 this.setState({ data: res.data.data });
               });
    }

    render() {
        // Map the weekdays i.e Sun, Mon, Tue etc as <td>
        let weekdays = this.weekdaysShort.map((day) => {
            return (
                <td key={day} className="week-day">{day}</td>
            )
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td key={i * 80} className="emptySlot">
                {""}
            </td>
            );
        }

        console.log("blanks: ", blanks);

        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            let className = (d == this.currentDay() ? "day current-day" : "day");
            let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
            daysInMonth.push(
                <td key={d} className={className + selectedClass} >
                    <span onClick={(e) => { this.onDayClick(e, d) }}>{d}</span>
                </td>
            );
        }


        console.log("days: ", daysInMonth);

        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let trElems = rows.map((d, i) => {
            return (
                <tr key={i * 100}>
                    {d}
                </tr>
            );
        });

        // const date = moment();
        // const firstTimeConverted = moment(firstTime, "HH:mma");
        // const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("diffTime: " + diffTime)
        // const tRemainder = diffTime % parseInt(sv.frequency, 10);
        // console.log("tRemainder: " + tRemainder)
        // const tMinutesTillTrain = parseInt(sv.frequency, 10) - tRemainder;
        // console.log("tMinutesTillTrain: " + tMinutesTillTrain)
        // const nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("nextTrain: " + nextTrain)


        return (
          <div>
            <div class="row">
              <div class="col-8">
                <div className="calendar-container" style={this.style}>
                  <table className="calendar">
                    <thead>
                      <tr className="calendar-header">
                        <td colSpan="5" className="month">
                          <this.MonthNav /> <this.YearNav />
                        </td>
                        <td colSpan="2" className="nav-month">
                          {/* <i
                            className="prev fa fa-fw fa-chevron-left"
                            onClick={e => {
                              this.prevMonth();
                            }}
                          ></i>
                          <i
                            className="prev fa fa-fw fa-chevron-right"
                            onClick={e => {
                              this.nextMonth();
                            }}
                          ></i> */}
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>{weekdays}</tr>
                      {trElems}
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-s4 reminders-container">
                <table>
                  <tbody>
                    <tr className="table-header">
                      <td>Reminder</td>
                      <td>Frequency</td>
                      <td>Next Due</td>
                    </tr>

                    {this.state.data.map(remind => {
                      return (
                        <tr className="table-content">
                          <td>{remind.reminder}</td>
                          <td>{remind.frequency}</td>
                          <td>{remind.start_date}</td>
                        </tr>
                      );
                    })}

                    <div>
                      {this.state.isShowing ? (
                        <div
                          onClick={this.closeModalHandler}
                          className="back-drop"
                        ></div>
                      ) : null}

                      <button
                        className="open-modal-btn"
                        onClick={this.openModalHandler}
                      >
                        Add Reminder
                      </button>

                      <Modal
                        className="modal"
                        show={this.state.isShowing}
                        close={this.closeModalHandler}
                      >
                        <div className="login-container">
                          <div className="row">
                            <div>
                              <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal">
                                  Add Reminders Here
                                </h1>
                                <div className="form-group">
                                  <label htmlFor="name">Add Reminder</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="reminder"
                                    placeholder="Enter a new Event here"
                                    value={this.state.reminder}
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="name">Add Frequency</label>
                                  <select
                                    className="form-control"
                                    placeholder="Enter frequency here"
                                    name="frequency"
                                    value={this.state.frequency}
                                    onChange={this.onChange}
                                  >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Fortnightly">Fortnightly</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Once">Once</option>
                                  </select>
                                  {/* <input
                                                                type="text"
                                                                className="form-control"
                                                                name="frequency"
                                                                placeholder="Enter frequency here"
                                                                value={this.state.frequency}
                                                                onChange={this.onChange}                                                            
                                                                /> */}
                                </div>
                                <div className="form-group">
                                  <label htmlFor="name">Start Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    placeholder="Enter your start date here"
                                    value={this.state.start_date}
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="name">End Date</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="end_date"
                                    placeholder="Enter your end date here"
                                    value={this.state.end_date}
                                    onChange={this.onChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="name">Address</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="Enter your Property's Address"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="btn-continue"
                                  onClick={this.closeModalHandler}
                                >
                                  Submit
                                </button>
                                <button
                                  className="btn-cancel"
                                  onClick={this.closeModalHandler}
                                >
                                  Close
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
}

export default Calendar;