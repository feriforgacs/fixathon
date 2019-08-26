const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongodbErrorHandler = require('mongoose-mongodb-errors');

const walletSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  },
  coins: {
    type: Number,
    trim: true,
    default: 10
  },
  created: Date,
  updated: Date
});

walletSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Wallet', walletSchema);