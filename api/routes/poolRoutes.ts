import express from 'express';
import PoolController from '../src/controllers/poolController';
import PoolModel from '../src/models/pool/poolModel';
import PoolService from '../src/services/poolService';

const poolModel = new PoolModel();
const poolService = new PoolService(poolModel);
const poolController = new PoolController(poolService);

const router = express.Router();

router.get("/get-all", (req, res) => poolController.getAll(req, res));
router.get("/:categoryId", (req, res) => poolController.getById(req, res));
router.post("/create-pool", (req, res) => poolController.createPool(req, res));

export default router;
