require("dotenv").config({ path: __dirname + "/Consumer.env" });
const log = require("../Utils/logger");
const airlineController = require("./controllers/airlineController");
const airportController = require("./controllers/airportController");
const flightController = require("./controllers/flightController");
const mongoAirlineService = require("./services/airline_service");
const mongoAirportService = require("./services/airport_service");
const mongoFlightService = require("./services/fliht_service");

log.info(`Consumer ${process.pid} started`);

const {
  airportsInputQueue,
  airlinesInputQueue,
  flightsInputQueue
} = require("./config/queues");

airportsInputQueue.process((job, done) => {
  log.info(`[airports] Proceso la job id: ${job.id}`);
  log.info(`[airports] Proceso el batch id: ${job.data.id}`);

  try {
    airportController.bulk(job.data.data).then(() => {
      log.info("[airports] Guardar en Mongo");

      mongoAirportService.save(job.data.data).then(() => {
        log.info("Guardado en Mongo!!");
      });
      //   .catch(err);
      // {
      //   log.warn(
      //     `No se pudo guardar en mongo los registros de aereopuerto registro: job id: ${job.id}`
      //   );
      // }
    });
    //   .catch(error);
    // {
    //   log.error(
    //     `[Airport] ERROR al guardar: => '${JSON.stringify(job.data.data)}'`
    //   );
    //   throw error;
    // }
  } catch (error) {
    log.error(`[Airport] ERROR: ${err}'`);
  }

  done();
});

airlinesInputQueue.process((job, done) => {
  log.info(`[airlines] Proceso la job id: ${job.id}`);
  log.info(`[airlines] Proceso el batch id: ${job.data.id}`);

  try {
    //Insertar en MySql
    airlineController.bulk(job.data.data).then(() => {
      mongoAirlineService.save(job.data.data).then(() => {
        log.info("[airlines] Guardado en Mongo!!");
      });
      //   .catch(err);
      // {
      //   log.warn(
      //     `No se pudo guardar en mongo los registros de aereolineas: job id: ${job.id}`
      //   );
      // }
    });
    //   .catch(error);
    // {
    //   log.error(
    //     `[airlines] ERROR al guardar: ${err} => '${JSON.stringify(
    //       job.data.data
    //     )}'`
    //   );
    // }
  } catch (e) {
    log.error(`[airlines] ERROR: ${err}'`);
  }

  done();
});

flightsInputQueue.process((job, done) => {
  log.info(`[flights] Proceso la job id: ${job.id}`);
  log.info(`[flights] Proceso el batch id: ${job.data.id}`);

  try {
    procesarVuelo(job.data.data);
  } catch (error) {
    log.error(`[airlines] ERROR al guardar: ${err}'`);
  }

  done();
});

const procesarVuelo = async arrayVuelos => {
  try {
    log.silly(`Inicio Proceso de Pipes para Vuelo`);

    pipeline = flightPipes();
    pipeline.run(arrayVuelos);
  } catch (e) {
    log.error(`Consumer.app => ${e}`);
  }
};

const flightPipes = arrayRetorno => {
  const Pipeline = require("./pipes-and-filters/pipes/pipeline");

  const pipeline = new Pipeline();

  const filterSetDateTime = (input, next) => {
    let inputRetorno = [];
    for (let i = 0; i < input.length; i++) {
      try {
        const element = input[i];

        if (
          element.year &&
          element.year > 999 &&
          element.month &&
          element.month > 0 &&
          element.day &&
          element.day > 0
        ) {
          log.silly(`Año: ${element.year}`);
          log.silly(`Mes: ${element.month}`);
          log.silly(`Dia: ${element.day}`);

          //element.full_datetime = new Date(element.year, element.month, element.day);
          element.full_datetime = `${element.year}-${element.month}-${element.day} 00:00:00.000`;

          inputRetorno.push(element);
        } else {
          log.error(
            `Consumer.app.filterSetDateTime => No se pudo calcular el campo: 'full_datetime' para el registro: ${JSON.stringify(
              element
            )}`
          );
        }
      } catch (e) {
        log.error(
          `Consumer.app.filterSetDateTime => No se pudo calcular el campo: 'scheduled_departure_datetime'`
        );
        log.error(`Error: ${e}`);
        log.error(`Para el registro: ${JSON.stringify(element)}`);
      }
    }

    next(null, inputRetorno);
  };

  const filterSetDeapertureTime = (input, next) => {
    let inputRetorno = [];
    for (let i = 0; i < input.length; i++) {
      try {
        const element = input[i];

        if (element.scheduled_departure && element.scheduled_departure > 1) {
          log.silly(`scheduled_departure: ${element.scheduled_departure}`);

          element.scheduled_departure_datetime = `2000-01-01 ${element.scheduled_departure.substr(
            0,
            2
          )}:${element.scheduled_departure.substr(2, 4)}:00.000`;

          inputRetorno.push(element);
        } else {
          log.error(
            `Consumer.app.filterSetDeapertureTime => No se pudo calcular el campo: 'scheduled_departure' para el registro: ${JSON.stringify(
              element
            )}`
          );
        }
      } catch (e) {
        log.error(
          `Consumer.app.filterSetDeapertureTime => No se pudo calcular el campo: 'scheduled_departure_datetime'`
        );
        log.error(`Error: ${e}`);
        log.error(`Para el registro: ${JSON.stringify(element)}`);
      }
    }
    next(null, inputRetorno);
  };

  const filterSetCompounedKey = (input, next) => {
    let inputRetorno = [];
    for (let i = 0; i < input.length; i++) {
      try {
        const element = input[i];

        if (element.scheduled_departure && element.scheduled_departure > 1) {
          log.silly(`scheduled_departure: ${element.scheduled_departure}`);

          element.compound_key = `${element.airline}_${element.flight_number}_${element.scheduled_departure}`;

          inputRetorno.push(element);
        } else {
          log.error(
            `Consumer.app.filterSetDeapertureTime => No se pudo calcular la clave`
          );
        }
      } catch (e) {
        log.error(
          `Consumer.app.filterSetDeapertureTime => No se pudo calcular la clave`
        );
        log.error(`Error: ${e}`);
        log.error(`Para el registro: ${JSON.stringify(element)}`);
      }
    }
    next(null, inputRetorno);
  };

  const filterPrint = (input, next) => {
    if (process.env.MODO == "DEV")
      log.silly(`Result from filter is ${JSON.stringify(input)}`);

    next(null, input);
  };

  pipeline.use(filterSetDateTime);
  pipeline.use(filterSetDeapertureTime);
  pipeline.use(filterSetCompounedKey);
  pipeline.use(filterPrint);

  pipeline.on("error", err => {
    log.silly(`The error is ${err}`);
  });

  pipeline.on("end", result => {
    log.info(`The result is ${JSON.stringify(result)}`);

    log.silly(`vuelosProcesados: ${result.length}`);

    try {
      flightController.bulk(result).then(() => {
        log.info("[flights] Guardar en Mongo");

        mongoFlightService.save(result).then(() => {
          log.info("Guardado en Mongo!!");
        });
        /*
          .catch(err);
        {
          log.warn(`No se pudo guardar en mongo los registros de vuelos: job id: ${result}`);
        }*/
      });
      //   .catch(error);
      // {
      //   log.error(`[Airport] ERROR al guardar: ${err} `);
      //   throw error;
      // }
    } catch (error) {
      log.error(`[Airport] ERROR al guardar: ${error} `);
    }
  });

  return pipeline;
};
