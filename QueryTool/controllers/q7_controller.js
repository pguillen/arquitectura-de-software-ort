const log = require("../../Utils/logger");
const statusCodes = require('./statusCodes');
const airlineService = require("../services/airline_service");
const airportService = require("../services/airport_service");
const flightService = require("../services/flight_service");

const q7_GetMetadata = async (req, res, next) => {

    try {
        if (req.query.collection == 'airlines') {
            try {

                res.locals.airlines = await airlineService.q7_Get_Airlines_Metadata();

                const Timer = res.locals.Timer;
                const start = res.locals.Query_Request_TimeStamp;
                const end = Timer.end();
                res.locals.Query_Response_TimeStamp = end;
                res.locals.Query_Processing_Time = Timer.getDifference(start, end);

                return res.status(statusCodes.SUCCESS).json(res.locals);
            } catch (err) {
                log.error('q7_controller.q7-airlines: ', err);
                next(err);
            }
        }

        if (req.query.collection == 'airports') {
            try {

                res.locals.airports = await airportService.q7_Get_Airports_Metadata();

                const Timer = res.locals.Timer;
                const start = res.locals.Query_Request_TimeStamp;
                const end = Timer.end();
                res.locals.Query_Response_TimeStamp = end;
                res.locals.Query_Processing_Time = Timer.getDifference(start, end);

                return res.status(statusCodes.SUCCESS).json(res.locals);
            } catch (err) {
                log.error('q7_controller.q7-airports: ', err);
                next(err);
            }
        }

        if (req.query.collection == 'flights') {
            try {
                
                res.locals.flights = await flightService.q7_Get_Flights_Metadata();

                const Timer = res.locals.Timer;
                const start = res.locals.Query_Request_TimeStamp;
                const end = Timer.end();
                res.locals.Query_Response_TimeStamp = end;
                res.locals.Query_Processing_Time = Timer.getDifference(start, end);

                return res.status(statusCodes.SUCCESS).json(res.locals);
            } catch (err) {
                log.error('q7_controller.q7-flights: ', err);
                next(err);
            }
        }
    } catch (err) {
        log.error('q7_controller.q7: ', err);
        next(err);
    }
};

module.exports = {
    q7_GetMetadata
}