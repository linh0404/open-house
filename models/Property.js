const Sequelize = require('sequelize')
const db = require('../database/db.js')
const User = require('./User')

var Properties = db.sequelize.define(
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

Properties.belongsTo(User, {foreignKey: 'landlord_contact', targetKey: 'email', as: 'landlord'});
Properties.belongsTo(User, {foreignKey: 'tenant_contact', targetKey: 'email',  as: 'tenant'});

Properties.findAll ({ where: {},
                        include: [{model: User, as: 'tenant', where: {email: "linh0404@hotmail.com"}}] , raw: true })
                        .then ((data) => {
                            console.log(data);
                        })

module.exports = Properties;



      