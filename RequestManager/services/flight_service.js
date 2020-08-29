const log = require('../../Utils/logger')
const MongooseFlight = require('../models/mongooseFlight');
const { flightsInputQueue } = require('../config/queues');
const baseService = require('./base_service');
const CONSTANT = require('./../config/const');

const fetch = async (id) => {
  return await MongooseFlight.findById(id)
}

const list = async () => {
  return await MongooseFlight.find((err, flights) => {
    log.silly(chalk.magenta(`Se encontraron ${flights.length} registros de 'flights'`));
    if (err) throw err;
  });
}

const save = async (reqData) => {

  let miFlight;
  try {
    if (!reqData._id) {

      log.silly((`Agregar un Vuelo...`));

      miFlight = new MongooseFlight({
        id: reqData.ID,
        year: reqData.YEAR,
        month: reqData.MONTH,
        day: reqData.DAY,
        day_of_week: reqData.DAY_OF_WEEK,
        airline: reqData.AIRLINE,
        flight_number: reqData.FLIGHT_NUMBER,
        tail_number: reqData.TAIL_NUMBER,
        origin_airport: reqData.ORIGIN_AIRPORT,
        destination_airport: reqData.DESTINATION_AIRPORT,
        scheduled_departure: reqData.SCHEDULED_DEPARTURE,
        departure_time: reqData.DEPARTURE_TIME,
        departure_delay: reqData.DEPARTURE_DELAY,
        taxi_out: reqData.TAXI_OUT,
        wheels_off: reqData.WHEELS_OFF,
        scheduled_time: reqData.SCHEDULED_TIME,
        elapsed_time: reqData.ELAPSED_TIME,
        air_time: reqData.AIR_TIME,
        distance: reqData.DISTANCE,
        wheels_on: reqData.WHEELS_ON,
        taxi_in: reqData.TAXI_IN,
        scheduled_arrival: reqData.SCHEDULED_ARRIVAL,
        arrival_time: reqData.ARRIVAL_TIME,
        arrival_delay: reqData.ARRIVAL_DELAY,
        diverted: reqData.DIVERTED,
        cancelled: reqData.CANCELLED,
        cancellation_reason: reqData.CANCELLATION_REASON,
        air_system_delay: reqData.AIR_SYSTEM_DELAY,
        security_delay: reqData.SECURITY_DELAY,
        airline_delay: reqData.AIRLINE_DELAY,
        late_aircraft_delay: reqData.LATE_AIRCRAFT_DELAY,
        weather_delay: reqData.WEATHER_DELAY
      });

      miFlight.save().then(function () {
        log.debug(`¡Vuelo '${reqData.FLIGHT_NUMBER}' Guardado!`);
      }, function (error) {
        log.error(`Error al guardar la aereolinea: ${error}`)
      });
    }
    else {
      log.info(`Actualizar registro`);

      miFlight.findByIdAndUpdate(reqData._id, reqData, { new: true }, (err, model) => {
        if (err) throw err;
      });
    }
  } catch (e) {
    log.error((e));
  }
}

const makeFlight = line => {
  const [
    year,
    month,
    day,
    day_of_week,
    airline,
    flight_number,
    tail_number,
    origin_airport,
    destination_airport,
    scheduled_departure,
    departure_time,
    departure_delay,
    taxi_out,
    wheels_off,
    scheduled_time,
    elapsed_time,
    air_time,
    distance,
    wheels_on,
    taxi_in,
    scheduled_arrival,
    arrival_time,
    arrival_delay,
    diverted,
    cancelled,
    cancellation_reason,
    air_system_delay,
    security_delay,
    airline_delay,
    late_aircraft_delay,
    weather_delay
  ] = line.split(",");
  return {
    year,
    month,
    day,
    day_of_week,
    airline,
    flight_number,
    tail_number,
    origin_airport,
    destination_airport,
    scheduled_departure,
    departure_time,
    departure_delay,
    taxi_out,
    wheels_off,
    scheduled_time,
    elapsed_time,
    air_time,
    distance,
    wheels_on,
    taxi_in,
    scheduled_arrival,
    arrival_time,
    arrival_delay,
    diverted,
    cancelled,
    cancellation_reason,
    air_system_delay,
    security_delay,
    airline_delay,
    late_aircraft_delay,
    weather_delay
  };
};

const submitJob = (ctx) => {
  return baseService.submitJob(ctx, flightsInputQueue);
};

const processLine = (line, ctx) => {
  const obj = makeFlight(line);

  log.silly(`Procesar obj [flight_number]: ${obj.flight_number}`);
  ctx.batch.push(obj);
  if (ctx.batch.length > CONSTANT.MAX_BATCH_SIZE) {
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