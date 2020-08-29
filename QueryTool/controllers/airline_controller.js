const airlineService = require('../services/airline_service');
const statusCodes = require('./statusCodes');
const log = require("../../Utils/logger");

const q5_Find_All_Airlines = async (req, res, next) => {
    try {

        res.locals.flights = await airlineService.q5_Find_All_Airlines();

        const Timer = res.locals.Timer;
        const start = res.locals.Query_Request_TimeStamp;
        const end = Timer.end();
        res.locals.Query_Response_TimeStamp = end;
        res.locals.Query_Processing_Time = Timer.getDifference(start, end);

        return res.status(statusCodes.SUCCESS).json(res.locals);

    } catch (err) {
        log.error('airline_controller.q5', err);
        next(err);
    }
};

module.exports = {
    q5_Find_All_Airlines
}