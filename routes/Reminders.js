const express = require('express');
const route = express.Router();
const cors = require('cors');
const Reminders = require('../models/Reminders');

route.use(cors())

route.post('/todo', (req, res) => {
    console.log("Howdy");
    let today = new Date().getTime();
    const newReminder = {
        reminder: req.body.reminder,
        frequency: req.body.frequency,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        address: req.body.address,
        created: today
    }
    console.log('newReminder', newReminder);
    Reminders.create(newReminder)
    .then(reminder => {
        console.log(reminder);
        res.json({msg: "reminder saved"})
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = route;