const log = require('../../Utils/logger')
var MongoClient = require('mongodb').MongoClient;
const dbMongo = require('./../config/dbMongo');

module.exports.save = async (arrayairports) => {

    try {

        log.info("Voy a guardar aereolineas:" + arrayairports.length);
        var url = `mongodb://${dbMongo.MONGO_SERVER}:${dbMongo.MONGO_PORT}/`;

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db(dbMongo.MONGO_DB);
            
            dbo.collection("airports").insertMany(arrayairports, function (err, res) {
                if (err) throw err;
                log.info("Number de aereopuertos insertados: " + res.insertedCount);
                db.close();
            });
        });

    } catch (e) {
        log.error((e));
    }
}