const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/mySqlSequelize').sequelize;
const log = require("./../../Utils/logger");
const { Airport } = require('../models/airport').Airport;

module.exports.create = async (jsonAirport) => {

    //Insertar en MySql
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonAirport)}`);

    try {
        const _airport = await Airport.create(jsonAirport);
        log.silly(`[Airport] Succsess => '${JSON.stringify(_airport)}'`);
    } catch (err) {
        log.error(`[Airport] ERROR al guardar: ${err} => '${JSON.stringify(jsonAirport)}'`);
    }
}

module.exports.bulk = async (jsonAirport) => {
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonAirport)}`);

    try {
        const _airport = await Airport.bulkCreate(jsonAirport);
        // you can now access the newly created user
        log.silly(`[Airport] Succsess => '${JSON.stringify(_airport)}'`);
    } catch (err) {
        
        throw err;
    }
}

