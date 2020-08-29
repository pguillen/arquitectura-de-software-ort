const log = require('../../Utils/logger')
const MongooseAirline = require('../models/mongooseAirline');
const { airlinesInputQueue } = require('../config/queues');
const baseService = require('./base_service');
const CONSTANT = require('./../config/const');

const fetch = async (id) => {
    return await MongooseAirline.findById(id)
}

const list = async () => {

    let misAirlines;
    log.silly("airline_service.list");
    try {
        let misAirlines = await MongooseAirline.find((err, airlines) => {
            log.silly(`Se encontraron ${airlines.length} registros de 'airlines'`);
            if (err) throw err;

        });

        log.info(`-> ${misAirlines}`);

    } catch (e) {
        log.error("Error airline_service.list:" + e);
    }
    return misAirlines;
}

const save = async (reqData) => {

    let miAirline;
    try {
        if (!reqData._id) {

            log.info("Voy a guardar una Aereolinea:" + JSON.stringify(reqData));

            miAirline = new MongooseAirline({
                id: reqData.ID,
                iata_code: reqData.IATA_CODE,
                airline: reqData.AIRLINE
            });

            log.info("Voy a guardar una Aereolinea2:" + JSON.stringify(miAirline));

            miAirline.save().then(function () {
                log.silly(("¡Aereolinea Guardada!"));
            }, function (error) {
                log.error(`Error al guardar la aereolinea: ${error}`)
            });
        }
        else {
            log.info(`Actualizar registro`);

            miAirline.findByIdAndUpdate(reqData._id, reqData, { new: true }, (err, model) => {
                if (err) throw err;
            });
        }
    } catch (e) {
        log.error((e));
    }
}

const makeAirline = line => {
    const [id, iata_code, airline] = line.split(",");
    return { id, iata_code, airline };
};

const submitJob = ctx => {
    return baseService.submitJob(ctx, airlinesInputQueue);
};

const processLine = (line, ctx) => {
    const obj = makeAirline(line);

    log.silly(`Procesar obj [name]: ${obj.airline}`);
    ctx.batch.push(obj);
    if (ctx.batch.length >= CONSTANT.MAX_BATCH_SIZE) {
        submitJob(ctx);
    }
    return ctx;
};


module.exports = {
    fetch,
    list,
    save,
    processLine,
    submitJob
}