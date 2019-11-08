import React, { Component } from 'react'
import moment from 'moment';
import './Reminders.css';

class Reminders extends Component {
    render() {
        return(
            <div class="reminder-container">
                <div class="card">
                    <div class="card-header">Current Train Schedule</div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Event</th>
                                    <th scope="col">Frequency (min)</th>
                                    <th scope="col">Next Date</th>
                                    <th scope="col">Days Away</th>
                                </tr>
                            </thead>
                            <tbody id="trainlist"></tbody>
                        </table>
                </div>
            </div>
        );
    }
}

export default Reminders;