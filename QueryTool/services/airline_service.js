const log = require('../../Utils/logger')
const MongooseAirline = require('../models/mongooseAirline');

const q5_Find_All_Airlines = async () => {
    return await MongooseAirline.find((err, airlines) => {
        log.silly(`Se encontraron ${airlines.length} registros de 'airlines'`);
        if (err) throw err;
    });
}

const q7_Get_Airlines_Metadata = async () => {
    const response = await MongooseAirline.getMetadata();
    log.silly(`Se devolvió la metadata de 'airlines'`);
    return response;
}

module.exports = {
    q5_Find_All_Airlines,
    q7_Get_Airlines_Metadata
}

