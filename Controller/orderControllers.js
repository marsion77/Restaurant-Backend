const orderService = require('../Services/orderService');

/**
 * POST /api/order/confirm
 * Body: { userId, address: { name, address1, address2, mobile }, customerEmail }
 */
const confirmOrder = async (req, res) => {
  try {
    const { userId, address, customerEmail } = req.body;

    // Validation
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required.' });
    }
    if (!customerEmail) {
      return res.status(400).json({ success: false, message: 'customerEmail is required.' });
    }
    if (!address || !address.name || !address.address1 || !address.mobile) {
      return res.status(400).json({
        success: false,
        message: 'Delivery address must include name, address1, and mobile.'
      });
    }

    const order = await orderService.placeOrder(userId, address, customerEmail);

    return res.status(201).json({
      success: true,
      message: `Order ${order.orderId} confirmed! A receipt has been sent to ${customerEmail}.`,
      order
    });
  } catch (error) {
    console.error('❌ confirmOrder error:', error.message);
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { confirmOrder };
