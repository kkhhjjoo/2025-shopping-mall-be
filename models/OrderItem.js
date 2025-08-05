const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = require('./Order');
const Product = require('./Product');
const orderItemSchema = Schema(
  {
    orderId: { type: mongoose.ObjectId, ref: 'Order' },
    productId: { type: mongoose.ObjectId, ref: 'Product' },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OrderItem', orderItemSchema);
