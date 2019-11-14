const Sequelize = require('sequelize')
const db = require('../database/db.js')

var Reminders = db.sequelize.define(
    'reminders',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reminder: {
            type: Sequelize.STRING
        },
        frequency: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.STRING
        },
        end_date: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)

module.exports = Reminders;