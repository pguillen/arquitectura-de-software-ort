var express = require('express');
var router = express.Router();
const flightController = require('../../../controllers/flight_controller');

router.get('/', flightController.list);
router.post('/', flightController.save);
router.get('/:id', flightController.fetch);

module.exports = router;

