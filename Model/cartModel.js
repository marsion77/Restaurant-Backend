const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  quantity: { type: Number, default: 1 }
});

// ✅ FIXED: userId as String (not ObjectId)
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },  // String for IP/email
  items: [cartItemSchema],
  totalAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Cart', cartSchema);
