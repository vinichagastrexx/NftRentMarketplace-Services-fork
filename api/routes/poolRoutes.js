const express = require('express');
const PoolController = require('../src/controllers/poolController');
const PoolModel = require('../src/models/poolModel');
const PoolService = require('../src/services/poolService');

const poolModel = new PoolModel();
const poolService = new PoolService(poolModel);
const poolController = new PoolController(poolService);

const router = express.Router();

router.get("/get-all", (req, res) => poolController.getAll(req, res));
router.get("/:categoryId", (req, res) => poolController.getById(req, res));
router.post("/create-pool", (req, res) => poolController.createPool(req, res));

module.exports = router;
