require("dotenv").config({ path: __dirname + "/RequestManager.env" });
const log           = require("../Utils/logger");
const maanagerMongo = require("./dataBase/conexion");
const cluster       = require("cluster");
const numCPUs       = require("os").cpus().length;
const app           = require("./router.js");

log.warn(`MAX_BATCH_SIZE: ${ require("./config/const").MAX_BATCH_SIZE} (Cant. lineas x Job)`);

if (cluster.isMaster) {
  log.info(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    log.info(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  maanagerMongo
    .conectar()
    .then(() => {

      // error handler
      app.use(function (err, req, res, next) {
        log.error(err);
        res.status(err.status || 500);
        if (process.env.NODE_ENV === "dev") {
          res.json(err);
        } else {
          res.jsonp({});
        }
      });

      const port = process.env.PORT || 3030;
      const listener = app.listen(port, () => {
        log.silly(`Servidor listo en el puerto: ${port}`);
      });

      module.exports = app;
    })
    .catch(err => log.error(`Error RequestManager.app MongoDB connection: ${err}`));

  log.info(`Worker ${process.pid} started`);
}