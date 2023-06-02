const express = require('express');
const router = express.Router();
const PoolController = require("../src/controllers/poolController")

router.get('/get-all', PoolController.getAll);

module.exports = router;