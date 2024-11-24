const { Sequelize, DataTypes } = require('sequelize');

const dbConfig = require('../config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operartorsAliases: false
});

sequelize.authenticate().then(() => {
    console.log('Connected to the database!');
}).catch(error => {
    console.log(`Error: ${error}`);
})

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./users.js')(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(() => {
    console.log('Re-sync done!');
});

module.exports = db;