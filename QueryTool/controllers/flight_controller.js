const flightService = require('../services/flight_service');
const statusCodes = require('./statusCodes');
const log = require("../../Utils/logger");

const q1_ComparePunctuality = async (req, res, next) => {
    const dateFrom = req.query.fecha_desde;
    const dateTo = req.query.fecha_hasta;

    try {

        res.locals.flights = await flightService.q1_ComparePunctuality(dateFrom, dateTo);

        const Timer = res.locals.Timer;
        const start = res.locals.Query_Request_TimeStamp;
        const end = Timer.end();
        res.locals.Query_Response_TimeStamp = end;
        res.locals.Query_Processing_Time = Timer.getDifference(start, end);

        return res.status(statusCodes.SUCCESS).json(res.locals);

    } catch (err) {
        log.error('flight_controller.q1: ', err);
        next(err);
    }
};

const q2_Cancelations = async (req, res, next) => {
    const dateFrom = req.query.fecha_desde;
    const dateTo = req.query.fecha_hasta;

    try {

        res.locals.flights = await flightService.q2_Cancelations(dateFrom, dateTo);

        const Timer = res.locals.Timer;
        const start = res.locals.Query_Request_TimeStamp;
        const end = Timer.end();
        res.locals.Query_Response_TimeStamp = end;
        res.locals.Query_Processing_Time = Timer.getDifference(start, end);

        return res.status(statusCodes.SUCCESS).json(res.locals);

    } catch (err) {
        log.error('flight_controller.q2: ', err);
        next(err);
    }
};

const q3_Cancelation_Reason = async (req, res, next) => {
    const dateFrom = req.query.fecha_desde;
    const dateTo = req.query.fecha_hasta;

    try {

        res.locals.flights = await flightService.q3_Cancelation_Reason(dateFrom, dateTo);

        const Timer = res.locals.Timer;
        const start = res.locals.Query_Request_TimeStamp;
        const end = Timer.end();
        res.locals.Query_Response_TimeStamp = end;
        res.locals.Query_Processing_Time = Timer.getDifference(start, end);

        return res.status(statusCodes.SUCCESS).json(res.locals);
        
    } catch (err) {
        log.error('flight_controller.q3: ', err);
        next(err);
    }
};

const q4_Diverted_Flights = async (req, res, next) => {
    const dateFrom = req.query.fecha_desde;
    const dateTo = req.query.fecha_hasta;

    try {

        res.locals.flights = await flightService.q4_Diverted_Flights(dateFrom, dateTo);

        const Timer = res.locals.Timer;
        const start = res.locals.Query_Request_TimeStamp;
        const end = Timer.end();
        res.locals.Query_Response_TimeStamp = end;
        res.locals.Query_Processing_Time = Timer.getDifference(start, end);

        return res.status(statusCodes.SUCCESS).json(res.locals);

    } catch (err) {
        log.error('flight_controller.q4: ', err);
        next(err);
    }
};

module.exports = {
    q1_ComparePunctuality,
    q2_Cancelations,
    q3_Cancelation_Reason,
    q4_Diverted_Flights
}