const Sequelize = require('sequelize')
const db = require('../database/db.js')

module.exports = db.sequelize.define(
    'properties',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        landlord_name: {
            type: Sequelize.STRING
        },
        landlord_contact: {
            type: Sequelize.STRING
        },
        tenant_name: {
            type: Sequelize.STRING
        },
        tenant_contact: {
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
