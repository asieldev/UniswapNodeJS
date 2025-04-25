const express = require('express');
const router = express.Router();
const uniswapController = require('../controllers/uniswapController');

router.get('/AsielApiTest', uniswapController.getPoolInfo);

module.exports = router;