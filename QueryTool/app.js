require("dotenv").config({ path: __dirname + "/QueryTool.env" });
const log = require("../Utils/logger");
const managerMongo = require("./dataBase/conexion");
const app = require("./router.js");

managerMongo
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

    const port = process.env.PORT || 3031;
    const listener = app.listen(port, () => {
      log.silly(`Servidor listo en el puerto: ${port}`);
    });

    module.exports = app;
  })
  .catch(err => log.error("Error MongoDB connection:", err));
