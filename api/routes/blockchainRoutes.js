const express = require('express');
const BlockchainController = require('../src/controllers/blockchainController');
const BlockchainModel = require('../src/models/blockchainModel');
const BlockchainService = require('../src/services/blockchainService');

const blockchainModel = new BlockchainModel();
const blockchainService = new BlockchainService(blockchainModel);
const blockchainController = new BlockchainController(blockchainService);

const router = express.Router();

router.post("/create-blockchain", (req, res) => blockchainController.createBlockchain(req, res));
router.get("/get-all", (req, res) => blockchainController.getAll(req, res));
router.get("/:id", (req, res) => blockchainController.getById(req, res));

module.exports = router;