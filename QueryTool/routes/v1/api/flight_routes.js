var express = require('express');
var router = express.Router();
const flightController = require('../../../controllers/flight_controller');
const passport = require('passport'); 
const passportConfig = require('../../../config/passport');
const mongoConfig = require('../../../config/dbMongo'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session); 
const TimeServiceManager = require('../../../services/timeServiceManager');

router.use(session({
    secret: 'ESTO ES SECRETO',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      url: mongoConfig.MONGO_CONNECTION(),
      autoReconnect: true
    })
  }))

router.use(passport.initialize());
router.use(passport.session());

router.get('/q1/', (req, res, next) => {
  const Timer = new TimeServiceManager();
  res.locals.Timer = Timer;
  res.locals.Query_Request_TimeStamp = Timer.start();
  next();
}, passportConfig.estaAutenticado, flightController.q1_ComparePunctuality);

router.get('/q2/', (req, res, next) => {
  const Timer = new TimeServiceManager();
  res.locals.Timer = Timer;
  res.locals.Query_Request_TimeStamp = Timer.start();
  next();
}, passportConfig.estaAutenticado, flightController.q2_Cancelations);

router.get('/q3/', (req, res, next) => {
  const Timer = new TimeServiceManager();
  res.locals.Timer = Timer;
  res.locals.Query_Request_TimeStamp = Timer.start();
  next();
}, passportConfig.estaAutenticado, flightController.q3_Cancelation_Reason);

router.get('/q4/', (req, res, next) => {
  const Timer = new TimeServiceManager();
  res.locals.Timer = Timer;
  res.locals.Query_Request_TimeStamp = Timer.start();
  next();
}, passportConfig.estaAutenticado, flightController.q4_Diverted_Flights);

module.exports = router;