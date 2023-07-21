import express from 'express';
import ItemController from '../src/controllers/itemController';
import ItemModel from '../src/models/item/itemModel';
import ItemService from '../src/services/itemService';

const itemModel = new ItemModel();
const itemService = new ItemService(itemModel);
const itemController = new ItemController(itemService);

const router = express.Router();

router.post('/create-item', (req, res) => itemController.createItem(req, res));
router.put('/add-to-pool/:itemId', (req, res) => itemController.addToPool(req, res));
router.get('/get-in-pool/:ownerAddress', (req, res) => itemController.getItemsInPoolByUser(req, res));
router.get('/get-rented/:ownerAddress', (req, res) => itemController.getItemsRentedByUser(req, res));
router.get('/get-owned/:ownerAddress', (req, res) => itemController.getByOwner(req, res));
router.get('/get-by-nft-id/:nftId/:nftContractAddress', (req, res) => itemController.getItemByNftId(req, res));
router.get('/:id', (req, res) => itemController.getById(req, res));

export default router;
