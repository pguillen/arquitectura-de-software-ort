const router = require('express').Router();
const airlineRoutes = require('./v1/api/airline_routes');
const airportRoutes = require('./v1/api/airport_routes');
const flightRoutes  = require('./v1/api/flight_routes');

//router.use('/auth', require('./auth'));

router.use("/airline", airlineRoutes);
router.use("/airport", airportRoutes);
router.use("/flight", flightRoutes);

router.get('/', function (req, res) {
    res.send('/v1');
});

module.exports = router;