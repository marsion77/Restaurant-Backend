const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
  name:       { type: String, required: true },   // snapshot at order time
  price:      { type: Number, required: true },   // snapshot at order time
  quantity:   { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  orderId:       { type: String, default: () => `SKY-${uuidv4().slice(0, 8).toUpperCase()}` },
  userId:        { type: String, required: true },   // email used as userId
  customerEmail: { type: String, required: true },   // recipient for confirmation email
  items:         [orderItemSchema],
  totalAmount:   { type: Number, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  address: {
    name:     String,
    address1: String,
    address2: String,
    mobile:   String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
