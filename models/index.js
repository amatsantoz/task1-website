const { Sequelize, DataTypes } = require('sequelize');
// driver sqlite
const sequelize = new Sequelize('sqlite::memory:');

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require('./todo')(sequelize, Sequelize);
db.empolyees = require('./pegawai')(sequelize, Sequelize);

module.exports = db;