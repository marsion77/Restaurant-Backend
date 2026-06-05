const cartService = require('../Services/cartService');

const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.user?.id || req.ip;
    const { menuItemId, quantity } = req.body;
    
    console.log('Adding to cart:', { userId, menuItemId, quantity });
    
    if (!userId || !menuItemId) {
      return res.status(400).json({ success: false, message: 'userId and menuItemId required' });
    }
    
    const cart = await cartService.addToCart(userId, menuItemId, quantity);
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.query.userId || req.user?.id || req.ip;
    console.log('Getting cart for userId:', userId);
    
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId required' });
    }
    
    const cart = await cartService.getCart(userId);
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { userId, menuItemId, quantity } = req.body;
    console.log('CONTROLLER UPDATE:', { userId, menuItemId, quantity });
    
    const cart = await cartService.updateQuantity(userId, menuItemId, quantity);
    res.json({ success: true, cart });
  } catch (error) {
    console.error('CONTROLLER ERROR:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId || req.user?.id || req.ip;
    const cart = await cartService.clearCart(userId);
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  clearCart
};
