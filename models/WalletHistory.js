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
  transaction: String,
  created: Date
});

walletHistorySchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('WalletHistory', walletHistorySchema);