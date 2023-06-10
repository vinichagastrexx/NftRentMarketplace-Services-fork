const express = require('express');
const router = express.Router();
const ItemController = require('../src/controllers/itemController');
const authMiddleware = require('../src/middlewares/auth')

router.post('/create-item', authMiddleware, ItemController.createItem);
router.post('/add-to-pool/:nftId', authMiddleware, ItemController.addToPool);
router.get('/get-in-pool/:owner', authMiddleware, ItemController.getItemsInPoolByUser);
router.get('/get-rented/:owner', authMiddleware, ItemController.getItemsRentedByUser);
router.get('/get-owned/:owner', authMiddleware, ItemController.getItemsOwnedByUser);


module.exports = router;