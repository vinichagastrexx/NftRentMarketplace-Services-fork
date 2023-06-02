const express = require('express');
const router = express.Router();
const PoolController = require("../src/controllers/poolController")

router.get('/get-all', PoolController.getAll);
router.get('/:poolId', PoolController.getById);

module.exports = router;