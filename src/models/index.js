const { Sequelize, DataTypes } = require('sequelize');

const dbConfig = require('../config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operartorsAliases: false,
    logging: false
});

sequelize.authenticate().then(() => {
    console.log('Connected to the database!');
}).catch(error => {
    console.log(`Error: ${error}`);
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.users = require('./users.js')(sequelize, DataTypes);
db.challenges = require('./challenges.js')(sequelize, DataTypes);

// Define relationships
db.users.hasMany(db.challenges, { foreignKey: "user_id", as: "challenges" });
db.challenges.belongsTo(db.users, { foreignKey: "user_id", as: "user" });

db.sequelize.sync({ force: false }).then(() => {
    console.log('Re-sync done!');
});

module.exports = db;