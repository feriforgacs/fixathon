const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongodbErrorHandler = require('mongoose-mongodb-errors');

const walletHistorySchema = new mongoose.Schema({
  wallet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Wallet',
    required: 'You must supply a wallet'
  },
  historyType: {
    type: String,
    required: 'You must supply a wallet history type'
  },
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item'
  },
  order: {
    type: mongoose.Schema.ObjectId,
    ref: 'Order'
  },
  transaction: String,
  created: Date
});

function autoPopulate(next){
  this.populate('item');
  this.populate('order');
  next();
}

walletHistorySchema.pre('find', autoPopulate);
walletHistorySchema.pre('findOne', autoPopulate);

walletHistorySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('WalletHistory', walletHistorySchema);