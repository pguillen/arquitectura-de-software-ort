let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let airportSchema = new Schema({
    id       : { type: Number, min: 0 },
    iata_code: { type: String },
    airport  : { type: String },
    city     : { type: String },
    state    : { type: String },
    country  : { type: String },
    latitude : { type: String },
    longitude: { type: String }
}, {
    versionKey: false
});

module.exports = mongoose.model('airports', airportSchema);
