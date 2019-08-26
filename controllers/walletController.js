const mongoose = require('mongoose');
const Wallet = mongoose.model('Wallet');
const WalletHistory = mongoose.model('WalletHistory');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.display = async (req, res) => {
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

exports.pay = async (req, res) => {
  // get item price from the database
  const itemId = req.params.itemId;
  const item = await Item.find({
    _id: itemId
  });

  // check current amount of coins in the users wallet
  const wallet = await Wallet.find({
    owner: req.user._id
  });

  if(!wallet || !item || wallet.coins < item.itemPrice){
    res.flash("error", "😔 You don't have enough coins in your wallet to trade this item.");
    res.redirect("back");
    return;
  }

  // deduct coins from users wallet


  // add coins to sellers wallet

  // save order

  // send email notification to seller

  // send email notification to user

  // redirect user to orders page
  
}