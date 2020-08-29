const log = require('../../Utils/logger')
const mongoConfig = require('../config/dbMongo');
const mongoose = require('mongoose');

module.exports.mongoose = mongoose;
module.exports.conectar = async function conectar() {
    log.silly(mongoConfig.MONGO_CONNECTION());

    mongoose.connect(mongoConfig.MONGO_CONNECTION(), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => log.info('¡Base de Datos Conectada!'))
        .catch(err => {
            log.error(`Error DB Connection: ${err.message}`);
        });
};