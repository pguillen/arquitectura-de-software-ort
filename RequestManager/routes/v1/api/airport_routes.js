var express = require("express");
var router = express.Router();
const airportController = require("../../../controllers/airport_controller");
const bodyParser = require("body-parser");

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   extended: true,
//   parameterLimit:50000
// }));
// app.use((req, res, next) => {
//   log.info(JSON.stringify(req.body));
//   next();
// })

router.get(
  "/",
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  }),
  airportController.list
);
router.post("/", airportController.save);
router.get("/:id", airportController.fetch);

module.exports = router;
