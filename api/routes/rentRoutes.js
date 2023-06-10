const express = require('express');
const router = express.Router();
const RentController = require('../src/controllers/rentController');

router.post('/start-rent', RentController.startRent);
router.get('/get-active-by-rentee/:rentee', RentController.getActiveByRentee);
router.get('/get-last-day', RentController.getRentsLastDay);
router.get('/get-all-by-rentee/:rentee', RentController.getAllByRentee);
router.post('/finish-rent', RentController.finishRent);

module.exports = router;