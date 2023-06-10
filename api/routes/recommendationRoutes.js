const express = require('express');
const router = express.Router();
const RecommendationController = require('../src/controllers/recommendationController');
const authMiddleware = require('../src/middlewares/auth')

router.get('/:userAddress', authMiddleware, RecommendationController.checkRecommendations);

module.exports = router;