const Sequelize = require('sequelize')
const db = {}
let sequelize;
if (process.env.JAWSDB_URL) {
      sequelize = new Sequelize(process.env.JAWSDB_URL, {dialect: 'mysql'})
} else {
    sequelize = new Sequelize('open_house', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
