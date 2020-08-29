let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let airlineSchema = new Schema({
    iata_code: { type: String },
    airline: { type: String }
}, {
    versionKey: false
});

airlineSchema.statics.getMetadata = () => {
    return {
        iata_code: 'Number',
        airline: 'String',
    }
}

module.exports = mongoose.model('airlines', airlineSchema);