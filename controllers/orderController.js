const mongoose = require('mongoose');
const mail = require('../handlers/mail');
const Item = mongoose.model('Item');
const Wallet = mongoose.model('Wallet');
const WalletHistory = mongoose.model('WalletHistory');
const User = mongoose.model('User');
const ItemRequest = mongoose.model('ItemRequest');
const Order = mongoose.model('Order');

/**
 * Process item request
 */

exports.itemRequest = async (req, res) => {
  /**
   * Check user status
   */
  if(!req.user || req.user.status != "confirmed"){
    req.flash("error", "You can request products only with a confirmed account.");
    res.redirect("back");
    return;
  }

  /**
   * Check requests with the same item and user id
   */
  const requests = await ItemRequest.find({
    item: req.body.item,
    author: req.user._id
  });

  if(requests.length){
    req.flash("error", "You've already sent a request for this item.");
    res.redirect("back");
    return;
  }

  /**
   * Get item data
   */
  let item = await Item.findOne({
    _id: req.body.item
  });

  /**
   * Check user coins, compare to item price
   */
  const wallet = await Wallet.findOne({
    owner: req.user._id
  });

  if(!item || !wallet){
    req.flash("error", "There was an error during the process. Please, try again in a few minutes.");
    res.redirect("back");
    return;
  }

  if(item.price > wallet.coins){
    req.flash("error", "You don't have ebough coins in your wallet to request this item.");
    res.redirect("back");
    return;
  }
  
  const itemRequest = await (new ItemRequest({
    item: req.body.item,
    created: Date.now(),
    author: req.user._id,
    message: req.body.itemRequestMessage,
    status: "unread"
  })).save();

  /**
   * Update item with request
   */
  item = await Item.findByIdAndUpdate(req.body.item,
    {
      $addToSet: { requests: req.user._id }
    },
    { new: true }
  );

  /**
   * Send mail to seller
   */
  const requestURL = `http://${req.headers.host}/item/${item._id}/request/${itemRequest._id}`;

  await mail.send({
    user: item.author,
    subject: 'Someone would like to buy your product on Re-Product',
    requestURL,
    item,
    filename: 'item-request'
  });

  req.flash("success", "🎉 Your request was sent successfully. You'll get an email if the seller selects you as the lucky one.");
  res.redirect("back");
}

/**
 * Display item request
 */
exports.displayRequest = async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.itemid
  });

  const request = await ItemRequest.findOneAndUpdate({
    _id: req.params.requestid
  }, {
    status: "read"
  }, {
    new: true
  }).populate(['author', 'item']);

  if(!item || !request){
    req.flash("error", "The request you are looking for doesn't exists.")
    res.redirect("/");
    return;
  }

  /**
   * Check item author and current user
   */
  if(item.author._id.toString() != req.user.id){
    req.flash("error", "You don't have permission to view this page.");
    res.redirect("/");
    return;
  }

  res.render('itemrequest', {
    title: `Request for item: ${item.itemName}`,
    item,
    request
  });
}

/**
 * Accept item request
 */
exports.acceptRequest = async (req, res) => {
  const item = await Item.findOne({
    _id: req.params.itemid
  });

  /**
   * Check item author and current user
   */
  if(item.author._id.toString() != req.user.id){
    req.flash("error", "You don't have permission to view this page.");
    res.redirect("/");
    return;
  }

  const request = await ItemRequest.findOne({
    _id: req.params.requestid
  }).populate('author');

  const buyer = await User.findOne({
    _id: request.author._id
  });

  if(!item || !request || !buyer){
    req.flash("error", "The request you are looking for doesn't exists.")
    res.redirect("/");
    return;
  }

  /**
   * Check if requester still have enough coins
   */
  if(buyer.wallet.coins < item.itemPrice){
    req.flash("error", "There is not enough coins in the buyer's wallet for this action. Please, choose another requester or get in touch with the user.")
    res.redirect("back");
    return;
  }

  /**
   * Add coins to sellers wallet and wallet history
   */
  const sellerWallet = await Wallet.findOneAndUpdate({
    owner: item.author._id
  }, {
    $inc: {
      coins: +item.itemPrice
    }
  }, {
    new: true
  });

  const sellerWalletHistoryPromise = new WalletHistory({
    wallet: sellerWallet._id,
    historyType: 'addition',
    item: req.params.itemid,
    transaction: `You sold an item (${item.itemName}) for ${item.itemPrice} coins.`,
    created: Date.now()
  });

  /**
   * Remove coins from buyers wallet and add it to wallet history
   */
  const buyerWallet = await Wallet.findOneAndUpdate({
    owner: buyer._id
  }, {
    $inc: {
      coins: -item.itemPrice
    }
  }, {
    new: true
  });

  const buyerWalletHistoryPromise = new WalletHistory({
    wallet: buyerWallet._id,
    historyType: 'deduction',
    item: req.params.itemid,
    transaction: `You bought an item (${item.itemName}) for ${item.itemPrice} coins.`,
    created: Date.now()
  });

  /**
   * Change item status to sold
   */
  const itemUpdatePromise = Item.findOneAndUpdate({
    _id: req.params.itemid
  }, {
    itemStatus: 'sold'
  }, {
    new: true
  });

  /**
   * Change request status to accepted
   */
  const requestUpdatePromise = ItemRequest.findOneAndUpdate({
    _id: req.params.requestid
  }, {
    status: 'accepted'
  }, {
    new: true
  });

  const [sellerWalletHistory, buyersWalletHistory, updatedItem, updatedRequest] = await Promise.all([sellerWalletHistoryPromise, buyerWalletHistoryPromise, itemUpdatePromise, requestUpdatePromise]);

  /**
   * Save order
   */
  const order = await (new Order({
    created: Date.now(),
    seller: item.author._id,
    sellerWalletHistory: sellerWalletHistory._id,
    buyer: buyer._id,
    buyerWalletHistory: buyersWalletHistory._id,
    item: updatedItem._id,
    orderMessage: req.body.requestAcceptMessage
  })).save();

  /**
   * Send notification to buyer
   */
  const orderURL = `http://${req.headers.host}/order/${order._id}`;

  const buyerNotificationPromise = mail.send({
    user: buyer,
    subject: 'The seller accepted your product request on Re-Product',
    orderURL,
    updatedItem,
    orderMessage: req.body.requestAcceptMessage,
    filename: 'request-accepted-buyer'
  });

  /**
   * Send confirmation to seller
   */
  const sellerNotificationPromise = mail.send({
    user: item.author,
    subject: 'You successfully sold one of your products on Re-Product',
    orderURL,
    updatedItem,
    orderMessage: req.body.requestAcceptMessage,
    filename: 'request-accepted-seller'
  });

  await Promise.all([buyerNotificationPromise, sellerNotificationPromise]);

  /**
   * Reload page and display success message
   */
  req.flash("success", "You successfully accepted the product request. We've sent a notification mail to the buyer and a confirmation mail to you as well.");
  res.redirect(`/order/${order.id}`);
}