const express = require('express');
const RentController = require('../src/controllers/rentController')
const rentController = new RentController();

const router = express.Router();

router.post("/start-rent", (req, res) => rentController.createRent(req, res));
router.get("/get-active-by-rentee/:rentee", (req, res) => rentController.getActiveByRentee(req, res));
router.get("/get-all-by-rentee/:rentee", (req, res) => rentController.getAllByRentee(req, res));
router.post("/finish-rent", (req, res) => rentController.finishRent(req, res));

module.exports = router;
