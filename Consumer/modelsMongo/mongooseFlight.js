let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let fligthSchema = new Schema({
    id                 : { type: Number, min: 0 },
    year               : { type: String },
    month              : { type: String },
    day                : { type: String },
    day_of_week        : { type: String },
    airline            : { type: String },
    flight_number      : { type: String },
    tail_number        : { type: String },
    origin_airport     : { type: String },
    destination_airport: { type: String },
    scheduled_departure: { type: String },
    departure_time     : { type: String },
    departure_delay    : { type: String },
    taxi_out           : { type: String },
    wheels_off         : { type: String },
    scheduled_time     : { type: String },
    elapsed_time       : { type: String },
    air_time           : { type: String },
    distance           : { type: String },
    wheels_on          : { type: String },
    taxi_in            : { type: String },
    scheduled_arrival  : { type: String },
    arrival_time       : { type: String },
    arrival_delay      : { type: String },
    diverted           : { type: String },
    cancelled          : { type: String },
    cancellation_reason: { type: String },
    air_system_delay   : { type: String },
    security_delay     : { type: String },
    airline_delay      : { type: String },
    late_aircraft_delay: { type: String },
    weather_delay      : { type: String },
    scheduled_departure_datetime      : { type: Date },
    full_datetime      : { type: Date },
    compound_key        : { type: String },
}, {
    versionKey         : false
});

module.exports = mongoose.model('fligths', fligthSchema);




