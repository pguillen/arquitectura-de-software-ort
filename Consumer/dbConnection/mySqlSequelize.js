const Sequelize = require('sequelize');
const mySqlConfig = require('../config/mySqlConnection');

const sequelize = new Sequelize(mySqlConfig.MYSQL_DB, mySqlConfig.MYSQL_USER, mySqlConfig.MYSQL_PASW, {
    host: mySqlConfig.MYSQL_SERVER,
    port: mySqlConfig.MYSQL_PORT,
    dialect: 'mysql'
}, {
    timestamps: false
});


module.exports.sequelize = sequelize;