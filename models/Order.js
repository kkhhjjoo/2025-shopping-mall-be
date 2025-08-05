const mongoose = require('mongoose');
const User = require('./User'); // 경로 수정
const Product = require('./Product');
const Schema = mongoose.Schema;

const orderSchema = Schema(
    {
        userId: {type: mongoose.ObjectId, ref: 'User', required: true }, // 문자열로 수정
        status: {type: String, default: 'preparing'},
        totalPrice: {type: Number, required: true, default: 0},
        shipTo: {type: Object, required: true},
        contact: {type: Object, required: true},
        orderNum: {type: String, required: true}, // orderNum 필드 추가
        items: [
            {
            productId: {type: mongoose.ObjectId, ref: 'Product', required: true}, // mongoose.Object -> mongoose.ObjectId, 문자열로 수정
            price: {type: Number, required: true},
            qty: {type: Number, required: true, default: 1},
            size: {type: String, required: true},
        },
      ],
    },
    {timestamps: true}
); 

orderSchema.methods.toJSON = function() {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updatedAt;
    return obj;
};

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;