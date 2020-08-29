const Sequelize = require("sequelize");
const sequelize = require("../dbConnection/mySqlSequelize").sequelize;
const airline = require("./airline").Airline;
const airport = require("./airport").Airport;
const log = require("./../../Utils/logger");

const Flight = sequelize.define(
  "flights",
  {
    id                    : { type: Sequelize.INTEGER, autoIncrement: true, unique: true },
    year               : { type: Sequelize.INTEGER, allowNull: false },
    month              : { type: Sequelize.INTEGER, allowNull: false },
    day                : { type: Sequelize.INTEGER, allowNull: false },
    day_of_week        : { type: Sequelize.INTEGER, allowNull: false },
    airline            : { type: Sequelize.STRING, allowNull: false },
    flight_number      : { type: Sequelize.STRING, allowNull: false },
    tail_number        : { type: Sequelize.STRING, allowNull: true },
    origin_airport     : { type: Sequelize.STRING, allowNull: true },
    destination_airport: { type: Sequelize.STRING, allowNull: true },
    scheduled_departure: { type: Sequelize.STRING, allowNull: true },
    departure_time     : { type: Sequelize.STRING, allowNull: true },
    departure_delay    : { type: Sequelize.STRING, allowNull: true },
    taxi_out           : { type: Sequelize.STRING, allowNull: true },
    wheels_off         : { type: Sequelize.STRING, allowNull: true },
    scheduled_time     : { type: Sequelize.STRING, allowNull: true },
    elapsed_time       : { type: Sequelize.STRING, allowNull: true },
    air_time           : { type: Sequelize.STRING, allowNull: true },
    distance           : { type: Sequelize.STRING, allowNull: true },
    wheels_on          : { type: Sequelize.STRING, allowNull: true },
    taxi_in            : { type: Sequelize.STRING, allowNull: true },
    scheduled_arrival  : { type: Sequelize.STRING, allowNull: true },
    arrival_time       : { type: Sequelize.STRING, allowNull: true },
    arrival_delay      : { type: Sequelize.STRING, allowNull: true },
    diverted           : { type: Sequelize.STRING, allowNull: true },
    cancelled          : { type: Sequelize.STRING, allowNull: true },
    cancellation_reason: { type: Sequelize.STRING, allowNull: true },
    air_system_delay   : { type: Sequelize.STRING, allowNull: true },
    security_delay     : { type: Sequelize.STRING, allowNull: true },
    airline_delay      : { type: Sequelize.STRING, allowNull: true },
    late_aircraft_delay: { type: Sequelize.STRING, allowNull: true },
    weather_delay      : { type: Sequelize.STRING, allowNull: true },
    scheduled_departure_datetime: {      type: Sequelize.DATE,      allowNull: true,      comment: "SCHEDULE_DEPARTURE in Date"
    },
    full_datetime: {      type: Sequelize.DATEONLY,      allowNull: true,      comment: "YEAR, MONTH, DAY"    },    compound_key: {      type: Sequelize.STRING,      allowNull: false,      primaryKey: true,      comment: "airline_flight_number_scheduled_departure"
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

const Sync = pforce => {
  // Flight.hasOne(airline, { foreignKey: 'airline' });
  // Flight.hasOne(airport, { foreignKey: 'destination_airport' });
  // Flight.hasOne(airport, { foreignKey: 'origin_airport' });

  Flight.sync({ force: pforce })
    .then(() => {
      log.info("[MySQL] Flight table OK");
    })
    .catch(error);
  {
    log.error("Error Models.Flight:", error);
  }
};

module.exports.Flight = { Flight, Sync };
