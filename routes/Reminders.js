const express = require('express');
const route = express.Router();
const cors = require('cors');
const Reminders = require('../models/Reminders');
const Property = require('../models/Property');
const Sequelize = require('sequelize');

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

route.get('/reminderList', (req, res) => {
    if (req.query.role === "Tenant") {

        Property.findAll({ where: { tenant_contact: req.query.email } }).then(response => {
            console.log(response.map(property => property.address))
            // res.json({ data: response })
            var addresses = response.map(property => property.address)
            Reminders.findAll({ where: { address: {[Sequelize.Op.in]: addresses}}}).then(response => {
                console.log(response)
                res.json({data:response})
    })
        })
    }
    else {
        Property.findAll({ where: { landlord_contact: req.query.email } }).then(response => {
            console.log(response.map(property => property.address))
            // res.json({ data: response })
            var addresses = response.map(property => property.address)
            Reminders.findAll({where: { address: {[Sequelize.Op.in]: addresses}}}).then(response => {
                console.log(response)
                res.json({data:response})
            })

        })
    }

})

module.exports = route;