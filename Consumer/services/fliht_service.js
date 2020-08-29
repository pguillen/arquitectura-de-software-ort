const log = require('../../Utils/logger')
var MongoClient = require('mongodb').MongoClient;
const dbMongo = require('./../config/dbMongo');

module.exports.save = async (arrayflights) => {

    try {

        log.info("Voy a guardar vuelos:" + arrayflights.length);
        var url = `mongodb://${dbMongo.MONGO_SERVER}:${dbMongo.MONGO_PORT}/`;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbMongo.MONGO_DB);
            
            dbo.collection("flights").insertMany(arrayflights, function (err, res) {
                if (err) throw err;
                log.info("Number vuelos insertados: " + res.insertedCount);
                db.close();
            });
        });

    } catch (e) {
        log.error((e));
    }
}