var express = require('express');
var router = express.Router();
const q7Controller = require('../../../controllers/q7_controller');
const passport = require('passport');
const bodyParser = require('body-parser');
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

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/q7/', (req, res, next) => {
  const Timer = new TimeServiceManager();
  res.locals.Timer = Timer;
  res.locals.Query_Request_TimeStamp = Timer.start();
  next();
}, passportConfig.estaAutenticado, q7Controller.q7_GetMetadata);

module.exports = router;