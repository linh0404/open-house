const Sequelize = require('sequelize')
const db = require('../database/db.js')
const Property = require('./Property')

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
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
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

Reminders.belongsTo(Property, {foreignKey: 'address', targetKey: 'address', as: 'property'});

Reminders.findAll ({ where: {}, 
                        include: [{model: Property, as: 'property', where: {}}], raw: true })
                        .then((data) => {
                            console.log(data);
                        })
                        
module.exports = Reminders;