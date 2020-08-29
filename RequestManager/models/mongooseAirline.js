let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let airlineSchema = new Schema({

    id       : { type: Number, min: 0 },
    iata_code: { type: String },
    airline  : { type: String }
}, {
    versionKey: false
});

module.exports = mongoose.model('airlines', airlineSchema);;