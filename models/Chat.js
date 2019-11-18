const Sequelize = require('sequelize')
const db = require('../databse/db.js')
const User = require('./User')

var Chats = db.sequelize.define(
    'chats', 
    {
        id: { 
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sender: {
            type: Sequelize.STRING
        },
        receiver: {
            type: Sequelize.STRING
        }, 
        message: {
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

Chats.belongsTo(User, {foreignKey: 'landlord_contact', targetKey: 'sender', as: 'landlord'});
Chats.belongsTo(User, {foreignKey: 'tenant_contact', targetKey: 'sender', as: 'tenant'});
Chats.belongsTo(User, { foreignKey: 'landlord_contact', targetKey: 'receiver', as: 'landlord' });
Chats.belongsTo(User, { foreignKey: 'tenant_contact', targetKey: 'receiver', as: 'tenant' });

Chats.findAll ({ where: {}, 
                    include: [{model: User, as: 'tenant', where:{} }], raw: true })
                    .then((data) => {
                        console.log(data);
                    })

module.exports = Chats;