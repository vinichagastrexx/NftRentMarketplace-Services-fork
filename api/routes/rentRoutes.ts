import express from 'express';
import RentController from '../src/controllers/rentController';
import ItemModel from '../src/models/item/itemModel';
import RentModel from '../src/models/rent/rentModel';
import ItemService from '../src/services/itemService';
import RentService from '../src/services/rentService';

const rentModel = new RentModel();
const rentService = new RentService(rentModel);
const itemModel = new ItemModel();
const itemService = new ItemService(itemModel);
const rentController = new RentController(rentService, itemService);

const router = express.Router();

router.post("/start-rent", (req, res) => rentController.createRent(req, res));
router.get("/get-active-by-rentee/:renteeAddress", (req, res) => rentController.getActiveByRentee(req, res));
router.get("/get-active-by-owner/:ownerAddress", (req, res) => rentController.getActiveByOwner(req, res));
router.get("/get-all-by-rentee/:renteeAddress", (req, res) => rentController.getAllByRentee(req, res));
router.patch("/finish-rent", (req, res) => rentController.finishRent(req, res));
router.get("/:id", (req, res) => rentController.getRentById(req, res));

export default router;
