const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongodbErrorHandler = require('mongoose-mongodb-errors');

const ordersSchema = new mongoose.Schema({
  created: {
    type: Date,
    required: 'Order - Order date is required',
    default: Date.now()
  },
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Order - Seller is required'
  },
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'Order - Buyer is required'
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: 'Order - Item is required'
  },
  orderMessage: {
    type: String,
    maxlength: 500,
    trim: true
  }
});

function autoPopulate(next){
  this.populate('seller');
  this.populate('buyer');
  this.populate('item');
  next();
}

ordersSchema.pre('find', autoPopulate);
ordersSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model("Order", ordersSchema);