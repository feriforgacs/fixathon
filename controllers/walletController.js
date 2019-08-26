const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');
const WalletHistory = mongoose.model('WalletHistory');
const promisify = require('es6-promisify');

exports.display = async (req, res, next) => {
  res.send("Wallet");
}