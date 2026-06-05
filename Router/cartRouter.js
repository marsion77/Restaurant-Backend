const express = require('express');
const router = express.Router();
const cartController = require('../Controller/cartController');
// const authMiddleware = require('../middleware/auth'); // if you have

router.post('/add', /* authMiddleware, */ cartController.addToCart);
router.get('/', /* authMiddleware, */ cartController.getCart);
router.post('/update', /* authMiddleware, */ cartController.updateQuantity);
router.post('/clear', /* authMiddleware, */ cartController.clearCart);

module.exports = router;
