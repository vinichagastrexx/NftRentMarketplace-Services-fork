const express = require('express');
const router = express.Router();
const ItemController = require('../src/controllers/itemController');

router.post('/add-item', ItemController.addItem);

module.exports = router;