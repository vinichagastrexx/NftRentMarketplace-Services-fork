const express = require('express');
const PoolController = require('../src/controllers/poolController')
const poolController = new PoolController();

const router = express.Router();

router.get("/get-all", (req, res) => poolController.getAll(req, res));
router.get("/:poolId", (req, res) => poolController.getById(req, res));
router.post("/create-pool", (req, res) => poolController.createPool(req, res));

module.exports = router;
