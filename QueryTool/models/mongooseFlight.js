let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let flightSchema = new Schema({
    year: { type: String },
    month: { type: String },
    day: { type: String },
    day_of_week: { type: String },
    airline: { type: String },
    flight_number: { type: String },
    tail_number: { type: String },
    origin_airport: { type: String },
    destination_airport: { type: String },
    scheduled_departure: { type: String },
    departure_time: { type: String },
    departure_delay: { type: Number },
    taxi_out: { type: String },
    wheels_off: { type: String },
    scheduled_time: { type: String },
    elapsed_time: { type: String },
    air_time: { type: String },
    distance: { type: String },
    wheels_on: { type: String },
    taxi_in: { type: String },
    scheduled_arrival: { type: String },
    arrival_time: { type: String },
    arrival_delay: { type: String },
    diverted: { type: String },
    cancelled: { type: String },
    cancellation_reason: { type: String },
    air_system_delay: { type: String },
    security_delay: { type: String },
    airline_delay: { type: String },
    late_aircraft_delay: { type: String },
    weather_delay: { type: String },
    full_date: { type: Date },
    scheduled_departure_datetime: { type: Date }
}, {
    versionKey: false
});

flightSchema.statics.getMetadata = () => {
    return {
        year: 'String',
        month: 'String',
        day: 'String',
        day_of_week: 'String',
        airline: 'String',
        flight_number: 'String',
        tail_number: 'String',
        origin_airport: 'String',
        destination_airport: 'String',
        scheduled_departure: 'String',
        departure_time: 'String',
        departure_delay: 'Number',
        taxi_out: 'String',
        wheels_off: 'String',
        scheduled_time: 'String',
        elapsed_time: 'String',
        air_time: 'String',
        distance: 'String',
        wheels_on: 'String',
        taxi_in: 'String',
        scheduled_arrival: 'String',
        arrival_time: 'String',
        arrival_delay: 'String',
        diverted: 'String',
        cancelled: 'String',
        cancellation_reason: 'String',
        air_system_delay: 'String',
        security_delay: 'String',
        airline_delay: 'String',
        late_aircraft_delay: 'String',
        weather_delay: 'String',
        full_date: 'Date',
        scheduled_departure_datetime: 'Date'
    }
}
module.exports = mongoose.model('flights', flightSchema);




