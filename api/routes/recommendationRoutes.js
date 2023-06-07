const express = require('express');
const router = express.Router();
const RecommendationController = require('../src/controllers/recommendationController');

router.get('/:userAddress', RecommendationController.checkRecommendations);

module.exports = router;