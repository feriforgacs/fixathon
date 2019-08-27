const mongoose = require('mongoose');
const mail = require('../handlers/mail');
const Item = mongoose.model('Item');
const Wallet = mongoose.model('Wallet');
const ItemRequest = mongoose.model('ItemRequest');

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