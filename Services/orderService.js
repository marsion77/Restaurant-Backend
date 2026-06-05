const Order = require('../Model/orderModel');
const Cart  = require('../Model/cartModel');
const { sendOrderConfirmationEmail } = require('../Utils/mailer');

/**
 * placeOrder
 * ──────────
 * 1. Fetch & validate the user's cart
 * 2. Build item snapshots (name + price at order time)
 * 3. Save the Order document
 * 4. Clear the cart
 * 5. Send HTML confirmation email to the customer
 */
const placeOrder = async (userId, address, customerEmail) => {
  // 1. Load cart with populated menu items
  const cart = await Cart.findOne({ userId }).populate('items.menuItemId');

  if (!cart || !cart.items || cart.items.length === 0) {
    throw new Error('Cart is empty. Please add items before placing an order.');
  }

  // 2. Build item snapshots (capture current price/name, not references)
  const orderItems = cart.items.map(cartItem => {
    const menu = cartItem.menuItemId;
    if (!menu) throw new Error('One or more cart items reference a deleted menu item.');
    return {
      menuItemId: menu._id,
      name:       menu.name,
      price:      menu.price,
      quantity:   cartItem.quantity
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 3. Save order
  const order = await Order.create({
    userId,
    customerEmail,
    items:       orderItems,
    totalAmount,
    address
  });

  // 4. Clear the cart
  await Cart.findOneAndUpdate(
    { userId },
    { items: [], totalAmount: 0 }
  );

  // 5. Send confirmation email (non-blocking on failure — log but don't crash)
  try {
    await sendOrderConfirmationEmail(customerEmail, {
      orderId:     order.orderId,
      items:       orderItems,
      totalAmount: order.totalAmount,
      address:     order.address
    });
  } catch (emailErr) {
    console.error('⚠️  Order placed but email failed:', emailErr.message);
  }

  return order;
};

module.exports = { placeOrder };
