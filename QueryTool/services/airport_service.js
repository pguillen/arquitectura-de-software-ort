const log = require('../../Utils/logger')
const MongooseAirport = require('../models/mongooseAirport');

const q6_Find_All_Airports = async () => {
    return await MongooseAirport.find((err, airports) => {
        log.silly(`Se encontraron ${airports.length} registros de 'airports'`);
        if (err) throw err;
    });
}

const q7_Get_Airports_Metadata = async () => {
    const response = await MongooseAirport.getMetadata();
    log.silly(`Se devolvió la metadata de 'airports'`);
    return response;
}

module.exports = {
    q6_Find_All_Airports,
    q7_Get_Airports_Metadata
}