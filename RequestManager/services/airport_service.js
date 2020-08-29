const log = require('../../Utils/logger')
const MongooseAirport = require('../models/mongooseAirport');
const { airportsInputQueue } = require('../config/queues');
const baseService = require('./base_service');
const CONSTANT = require('./../config/const');

const fetch = async (id) => {
    return await MongooseAirport.findById(id)
}

const list = async () => {
    return await MongooseAirport.find((err, airports) => {
        log.silly((`Se encontraron ${airports.length} registros de 'airports'`));
        if (err) throw err;

    });
}

const save = async (reqData) => {

    let miAirport;
    try {
        if (!reqData._id) {

            log.silly((`Agregar un Aereopuerto...`));

            miAirport = new MongooseAirport({
                id: reqData.ID,
                iata_code: reqData.IATA_CODE,
                airport: reqData.AIRPORT,
                city: reqData.CITY,
                state: reqData.STATE,
                country: reqData.COUNTRY,
                latitude: reqData.LATITUDE,
                longitude: reqData.LONGITUDE
            });

            miAirport.save().then(function () {
                log.silly(("Aereopuerto Guardado!"));
            }, function (error) {
                log.error(`Error al guardar la aereolinea: ${error}`)
            });
        }
        else {
            log.info(`Actualizar registro`);

            miAirport.findByIdAndUpdate(reqData._id, reqData, { new: true }, (err, model) => {
                if (err) throw err;
            });
        }
    } catch (e) {
        log.error((e));
    }
}

const makeAirport = line => {
    const [iata_code, name, city, state, country, lat, lng] = line.split(",");
    return { iata_code, name, city, state, country, lat, lng };
};

const submitJob = (ctx) => {
    return baseService.submitJob(ctx, airportsInputQueue);
};


const processLine = (line, ctx) => {
    const obj = makeAirport(line);

    log.silly(`Procesar obj [name]: ${obj.name}`);
    ctx.batch.push(obj);
    if (ctx.batch.length > CONSTANT.MAX_BATCH_SIZE) {
        submitJob(ctx);
    }
};


module.exports = {
    fetch,
    save,
    list,
    processLine,
    submitJob
}