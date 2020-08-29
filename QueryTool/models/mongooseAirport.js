let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let airportSchema = new Schema({
    iata_code: { type: String },
    airport: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    latitude: { type: String },
    longitude: { type: String }
}, {
    versionKey: false
});

airportSchema.statics.getMetadata = () => {
    return {
        iata_code: 'String',
        airport: 'String',
        city: 'String',
        state: 'String',
        country: 'String',
        latitude: 'String',
        longitude: 'String'
    }
}

module.exports = mongoose.model('airports', airportSchema);
