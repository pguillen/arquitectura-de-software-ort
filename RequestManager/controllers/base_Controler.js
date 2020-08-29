const log = require('../../Utils/logger')
const statusCodes = require('./statusCodes');

const readline = require("readline");
const stream = require("stream");


class ProcessingContext {
    constructor() {
        this.batch = [];
    }

    clearBatch() {
        this.batch = [];
    }
}
module.exports = class base_Control {
    constructor(pServicio) {
        this.defineService = pServicio;
    }

    async save(req, res, next) {
        try {
            const ctx = new ProcessingContext;
            const rl = readline.createInterface({
                input: req,
                crlfDelay: Infinity
            });
            rl.on("line", line => {
                log.silly(`Recibida linea: ${line}`);
                this.defineService.processLine(line, ctx);
                //   yield this;

            }).on("close", () => {
                log.silly("rl completado.");
                // creamos el job
                this.defineService.submitJob(ctx);
                res.sendStatus(statusCodes.SUCCESS);
            });

            req.on("close", () => {
                log.silly("close");
            });
        } catch (err) {
            next(err);
        }
        // return res.status(statusCodes.CLIENT_ERROR).json(req);;
    };
}