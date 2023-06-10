const express = require('express');
const router = express.Router();
const RentController = require('../src/controllers/rentController');
const authMiddleware = require('../src/middlewares/auth')

router.post('/start-rent', authMiddleware, RentController.startRent);
router.get('/get-active-by-rentee/:rentee', authMiddleware, RentController.getActiveByRentee);
router.get('/get-last-day', RentController.getRentsLastDay);
router.get('/get-all-by-rentee/:rentee', authMiddleware, RentController.getAllByRentee);
router.post('/finish-rent', authMiddleware, RentController.finishRent);

module.exports = router;