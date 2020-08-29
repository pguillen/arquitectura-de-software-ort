const log = require('../../Utils/logger')
var MongoClient = require('mongodb').MongoClient;
const MongooseAirline = require('./../modelsMongo/mongooseAirline');
const dbMongo = require('./../config/dbMongo');

module.exports.save = async (arrayAirlines) => {

    try {

        log.info("Voy a guardar aereolineas:" + arrayAirlines.length);
        var url = `mongodb://${dbMongo.MONGO_SERVER}:${dbMongo.MONGO_PORT}/`;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbMongo.MONGO_DB);
            
            dbo.collection("airlines").insertMany(arrayAirlines, function (err, res) {
                if (err) throw err;
                log.info("Number de aereolineas insertadas: " + res.insertedCount);
                db.close();
            });
        });

    } catch (e) {
        log.error((e));
    }
}