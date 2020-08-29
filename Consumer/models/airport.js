const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/mySqlSequelize').sequelize;
const log = require("./../../Utils/logger");

const Airport = sequelize.define('airports', {
    id        : { type: Sequelize.INTEGER, autoIncrement: true, unique: true },
    iata_code: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    airport  : { type: Sequelize.STRING, allownull: false, unique: true },
    city     : { type: Sequelize.STRING, allownull: false },
    state    : { type: Sequelize.STRING, allownull: false },
    country  : { type: Sequelize.STRING, allownull: false },
    latitude : { type: Sequelize.STRING, allownull: true },
    longitude: { type: Sequelize.STRING, allownull: true }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

const Sync = (pforce) => {
    Airport.sync({ force: pforce }).then(() => {
        log.info("[MySQL] Airport table OK");
    }).catch(error)
    {
        log.error("Error Models.Airport:", error);
    };
}

//Sync(true);


module.exports.Airport = { Airport, Sync }