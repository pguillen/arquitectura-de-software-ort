const airportService = require("../services/airport_service");
const statusCodes = require("./statusCodes");
const log = require("../../Utils/logger");

const q6_Find_All_Airports = async (req, res, next) => {
  try {

    res.locals.flights = await airportService.q6_Find_All_Airports();

    const Timer = res.locals.Timer;
    const start = res.locals.Query_Request_TimeStamp;
    const end = Timer.end();
    res.locals.Query_Response_TimeStamp = end;
    res.locals.Query_Processing_Time = Timer.getDifference(start, end);

    return res.status(statusCodes.SUCCESS).json(res.locals);

  } catch (err) {
    log.error('airline_controller.q6', err);
    next(err);
  }
};

module.exports = {
  q6_Find_All_Airports
};