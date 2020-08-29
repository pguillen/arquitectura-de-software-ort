const airlineService = require('../services/airline_service');
const BaseController = require('./base_Controler');
const statusCodes = require('./statusCodes');
const log = require("../../Utils/logger");

const list = async (req, res, next) => {
    try {
        log.silly("airline_controller.list");
        const airline = await airlineService.list();
        return res.status(statusCodes.SUCCESS).json(airline);
    } catch (err) {
        log.error(`Error airline_controller.list: ${err}`);
        next(err);
    }
};

const fetch = async (req, res, next) => {
    try {
        const airline = await airlineService.fetch(req.params.id);
        return res.status(statusCodes.SUCCESS).json(airline);
    } catch (err) {
        next(err);
    }
};

const save = async (req, res, next) => {

    const baseConstroler = new BaseController(airlineService);

    return await baseConstroler.save(req, res, next);
};

module.exports = {
    list,
    fetch,
    save
}