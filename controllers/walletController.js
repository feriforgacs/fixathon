const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');
const WalletHistory = mongoose.model('WalletHistory');
const promisify = require('es6-promisify');

exports.display = async (req, res, next) => {
  const wallet = await Wallet.findOne({
    owner: req.user._id
  });

  const walletHistory = await WalletHistory.find({
    wallet: wallet._id
  });

  res.render('wallet', {
    title: 'Wallet',
    wallet,
    walletHistory
  });
}