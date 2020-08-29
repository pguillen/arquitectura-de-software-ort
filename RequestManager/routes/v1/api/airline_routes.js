var express = require('express');
var router = express.Router();
const airlineController = require('../../../controllers/airline_controller');

//router.get('/', airlineController.list);
router.post('/', airlineController.save);
//router.get('/:id', airlineController.fetch);

module.exports = router;