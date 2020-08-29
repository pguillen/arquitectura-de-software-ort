const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/mySqlSequelize').sequelize;
const log = require("./../../Utils/logger");
const { Airline } = require('../models/airline').Airline;

module.exports.create = async (jsonAirline) => {

    //Insertar en MySql
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonAirline)}`);

    try {
        const _airline = await Airline.create(jsonAirline);
        log.silly(`[Airline] Succsess => '${JSON.stringify(_airline)}'`);
    } catch (err) {
        log.error(`[Airline] ERROR al guardar: ${err} => '${JSON.stringify(jsonAirline)}'`);
    }
}

module.exports.bulk = async (jsonAirline) => {
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonAirline)}`);

    try {
        const _airline = await Airline.bulkCreate(jsonAirline);
        // you can now access the newly created user
        log.silly(`[Airline] Succsess => '${JSON.stringify(_airline)}'`);
    } catch (err) {
        // print the error details
        log.error(`[Airline] ERROR al guardar: ${err} => '${JSON.stringify(jsonAirline)}'`);
    }
}

