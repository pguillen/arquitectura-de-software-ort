var express = require('express');
var router = express.Router();
const mongoConfig = require('../../../config/dbMongo'); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session); 
const passport = require('passport'); 
const bodyParser = require('body-parser'); 
const userController = require('../../../controllers/user_controller');
const passportConfig = require('../../../config/passport');

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

router.post('/signup', userController.postSignup);
router.post('/login', userController.postLogin);
router.get('/logout', passportConfig.estaAutenticado, userController.logout);
router.get('/userinfo', passportConfig.estaAutenticado, (req, res) => {
    res.json(req.user);
})

module.exports = router;