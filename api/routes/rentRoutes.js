const express = require('express');
const router = express.Router();
const RentController = require('../src/controllers/rentController');

router.post('/start-rent', RentController.startRent);
router.get('/get-by-rentee/:rentee', RentController.getByRentee);
router.post('/finish-rent', RentController.finishRent);

module.exports = router;