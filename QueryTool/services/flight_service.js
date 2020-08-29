const log = require('../../Utils/logger')
const MongooseFlight = require('../models/mongooseFlight');
const query1Pipeline = require('./queryPipelines/query1');
const query2Pipeline = require('./queryPipelines/query2');
const query3Pipeline = require('./queryPipelines/query3');
const query4Pipeline = require('./queryPipelines/query4');

const q1_ComparePunctuality = async (dateFrom, dateTo) => {
    return await MongooseFlight.aggregate(query1Pipeline.query1(dateFrom, dateTo), (err, flights) => {
        log.silly(`Se encontraron ${flights.length} registros de 'flights'`);
        if (err) throw err;
    });
}

const q2_Cancelations = async (dateFrom, dateTo) => {
    return await MongooseFlight.aggregate(query2Pipeline.query2(dateFrom, dateTo), (err, flights) => {
        log.silly(`Se encontraron ${flights.length} registros de 'flights'`);
        if (err) throw err;
    });
}

const q3_Cancelation_Reason = async (dateFrom, dateTo) => {
    return await MongooseFlight.aggregate(query3Pipeline.query3(dateFrom, dateTo), (err, flights) => {
        log.silly(`Se encontraron ${flights.length} registros de 'flights'`);
        if (err) throw err;
    });
}

const q4_Diverted_Flights = async (dateFrom, dateTo) => {
    return await MongooseFlight.aggregate(query4Pipeline.query4(dateFrom, dateTo), (err, flights) => {
        log.silly(`Se encontraron ${flights.length} registros de 'flights'`);
        if (err) throw err;
    });
}

const q7_Get_Flights_Metadata = async () => {
    const response = await MongooseFlight.getMetadata();
    log.silly(`Se devolvió la metadata de 'flights'`);
    return response;
}

module.exports = {
    q1_ComparePunctuality,
    q2_Cancelations,
    q3_Cancelation_Reason,
    q4_Diverted_Flights,
    q7_Get_Flights_Metadata
}
