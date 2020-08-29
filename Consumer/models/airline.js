const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/mySqlSequelize').sequelize;
const log = require("./../../Utils/logger");

const Airline = sequelize.define('airlines', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, unique: true },
    //row_id: { type: Sequelize.STRING, unique: true },
    iata_code: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
    airline: { type: Sequelize.STRING, allowNull: false, unique: true }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

const Sync = (pforce) => {
    Airline.sync({ force: pforce }).then(() => {
        log.info("[MySQL] Airline table OK");
    }).catch(error)
    {
        log.error("Error Models.Airline:", error);
    };
}

//Sync(true);

module.exports.Airline = { Airline, Sync }