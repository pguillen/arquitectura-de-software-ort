const router = require('express').Router();
const authRoutes  = require('./v1/api/auth_routes');
const airlineRoutes = require('./v1/api/airline_routes');
const airportRoutes = require('./v1/api/airport_routes');
const flightRoutes  = require('./v1/api/flight_routes');
const q7Route  = require('./v1/api/q7_route');

router.use("/auth", authRoutes);
router.use("/airline", airlineRoutes);
router.use("/airport", airportRoutes);
router.use("/flight", flightRoutes);
router.use("/q7", q7Route);

router.get('/', function (req, res) {
    res.send('/v1');
});

module.exports = router;