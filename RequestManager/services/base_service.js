const log = require('../../Utils/logger')
const uuid = require("uuid").v4;

module.exports.submitJob = (ctx, pInputQueue) => {
    // creamos el job
    const job = {
        id: uuid(),
        data: ctx.batch,
        created: Date.now()
    };

    log.info(`Crear Job de ${job.data.length - 1} elementos.`);
    pInputQueue.add(job);
    ctx.clearBatch();
    return ctx;
};