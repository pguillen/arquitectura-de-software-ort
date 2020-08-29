const flightService = require('../services/flight_service');
const BaseController = require('./base_Controler');
const statusCodes = require('./statusCodes');
const log = require("../../Utils/logger");


const list = async (req, res, next) => {
    try {
        const fligths = await flightService.list();
        return res.status(statusCodes.SUCCESS).json(fligths);
    } catch (err) {
        next(err);
    }
};


const fetch = async (req, res, next) => {
    try {
        const fligth = await flightService.fetch(req.params.id);
        return res.status(statusCodes.SUCCESS).json(fligth);
    } catch (err) {
        next(err);
    }
};

const save = async (req, res, next) => {
    const baseConstroler = new BaseController(flightService);
    return await baseConstroler.save(req, res, next);
};


module.exports = {
    list,
    fetch,
    save
}