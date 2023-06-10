const express = require('express');
const router = express.Router();
const PoolController = require("../src/controllers/poolController")
const authMiddleware = require('../src/middlewares/auth')

router.get('/get-all', authMiddleware, PoolController.getAll);
router.get('/:poolId', authMiddleware, PoolController.getById);
router.post('/create-pool', authMiddleware, PoolController.createPool);

module.exports = router;