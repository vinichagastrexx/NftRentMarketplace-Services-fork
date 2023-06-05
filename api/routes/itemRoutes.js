const express = require('express');
const router = express.Router();
const ItemController = require('../src/controllers/itemController');

router.post('/create-item', ItemController.createItem);
router.post('/add-to-pool/:nftId', ItemController.addToPool);
router.get('/get-in-pool/:owner', ItemController.getItemsInPoolByUser);
router.get('/get-rented/:owner', ItemController.getItemsRentedByUser);
// router.post('/rent-item', ItemController.addItem);

module.exports = router;