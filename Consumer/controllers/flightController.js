const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/mySqlSequelize').sequelize;
const log = require("./../../Utils/logger");
const { Flight } = require('../models/Flight').Flight;

module.exports.create = async (jsonFlight) => {

    //Insertar en MySql
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonFlight)}`);

    try {
        const _flight = await Flight.create(jsonFlight);
        log.silly(`[Flight] Succsess => '${JSON.stringify(_flight)}'`);
    } catch (err) {
        log.error(`[Flight] ERROR al guardar: ${err} => '${JSON.stringify(jsonFlight)}'`);
    }
}

module.exports.bulk = async (jsonFlight) => {
    log.info(`[Consumer.model.create] DATA: ${JSON.stringify(jsonFlight)}`);

    try {
        const _flight = await Flight.bulkCreate(jsonFlight);
        // you can now access the newly created user
        log.silly(`[Flight] Succsess => '${JSON.stringify(_flight)}'`);
    } catch (err) {
        // print the error details
        log.error(`[Flight] ERROR al guardar: ${err} => '${JSON.stringify(jsonFlight)}'`);
    }
}

