const express = require('express');
const router = express.Router();
const { confirmOrder } = require('../Controller/orderControllers');

// POST /api/order/confirm
router.post('/confirm', confirmOrder);

module.exports = router;
