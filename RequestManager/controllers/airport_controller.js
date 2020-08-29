const airportService = require("../services/airport_service");
const BaseController = require("./base_Controler");
const statusCodes = require("./statusCodes");
const Queue = require("bull");
const log = require("../../Utils/logger");

const consumerQueue = new Queue("airports-input", {
  redis: {
    //password: "redisdev!",
    host: "localhost"
  }
});

const list = async (req, res, next) => {
  try {
    const airports = await airportService.list();
    return res.status(statusCodes.SUCCESS).json(airports);
  } catch (err) {
    next(err);
  }
};

const fetch = async (req, res, next) => {
  try {
    const airport = await airportService.fetch(req.params.id);
    return res.status(statusCodes.SUCCESS).json(airport);
  } catch (err) {
    next(err);
  }
};

const save = async (req, res, next) => {
  const baseConstroler = new BaseController(airportService);
  return await baseConstroler.save(req, res, next);

};

module.exports = {
  list,
  fetch,
  save
};
