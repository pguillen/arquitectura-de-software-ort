const log         = require('../../Utils/logger')
const mongoConfig = require('../config/dbMongo');
const mongoose    = require('mongoose');


module.exports.mongoose = mongoose;
module.exports.conectar = async function conectar() 
{
    log.silly(mongoConfig.MONGO_CONNECTION());

    mongoose.connect(mongoConfig.MONGO_CONNECTION(), {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(() => log.info('¡Base de Datos Conectada!'))
        .catch(err => {
            log.error(`Error DB Connection: ${err}`);
            throw err;
        });

    //mongoose.connect('mongodb://username:password@port.mlab.com:15446/databasename', { useUnifiedTopology: true,     useNewUrlParser: true, }); 

};