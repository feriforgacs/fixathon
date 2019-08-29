const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const ItemRequest = mongoose.model('ItemRequest');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const crypto = require('crypto');
const mail = require('../handlers/mail');
const helper = require('../helpers');
const fs = require('fs');

/**
 * Image upload settings
 */
const multerOptions = {
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 1024 * 1024
  },
  fileFilter(req, file, next) {
    // check file format
    if(file.mimetype.startsWith('image/')){
      next(null, true);
    } else {
      // invalid file
      next({ message: 'The selected file type is not supported. Please, choose an other image.'}, false);
    }
  }
}

/**
 * Upload selected image
 */
exports.upload = multer(multerOptions).single('itemPhoto');

/**
 * Resize and rename selected image
 */
exports.resize = async (req, res, next) => {
  // check if there is no file to resize
  if(!req.file){
    return next();
  }

  // get image extension
  const imageExtension = req.file.mimetype.split('/')[1];

  // generate random name and add extension to it
  req.body.itemPhoto = `${uuid.v4()}.${imageExtension}`;

  // resize
  const itemPhoto = await jimp.read(req.file.buffer);
  if(itemPhoto.bitmap.height > itemPhoto.bitmap.width){
    await itemPhoto.resize(jimp.AUTO, 800);
  } else {
    await itemPhoto.resize(800, jimp.AUTO);
  }

  /**
   * Check if folder exists and create if not
   */
  const uploadDir = './public/uploads/';
  if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
  }

  await itemPhoto.write(`./public/uploads/${req.body.itemPhoto}`);

  next();
}

/**
 * Add new item - Display form
 */
exports.addItem = (req, res) => {
  res.render('itemEdit', {
    title: 'Add New Item',
    buttonText: 'Create new item',
    newItem: true
  });
};

/**
 * Save new item to database
 */
exports.createItem = async (req, res) => {
  /**
   * Generate item token
   */
  req.body.itemToken = crypto.randomBytes(20).toString('hex');
  req.body.itemCreated = Date.now();
  req.body.author = req.user._id;

  const item = await (new Item(req.body)).save();

  /**
   * Send notification to admin about the new item
   */
  const approveURL = `https://${req.headers.host}/item/approve/${item.itemToken}/${item._id}`;
  const previewURL = `https://${req.headers.host}/item/preview/${item.itemToken}/${item._id}`;
  const user = {
    name: process.env.ADMIN_NOTIFICATION_NAME,
    email: process.env.ADMIN_NOTIFICATION_EMAIL
  };

  await mail.send({
    user,
    subject: 'New Re-Product item 🚀 Review it!',
    approveURL,
    previewURL,
    uploaderName: req.user.name,
    uploaderEmail: req.user.email,
    filename: 'item-confirm'
  });

  req.flash('success', `🎉 Your item was created successfully. We'll review it soon (24-48 hours) and send you an email when it's live.`);
  res.redirect(`/item/${item.itemSlug}`);
}

/**
 * Get items from the database
 */
exports.getItems = async (req, res) => {
  const items = await Item.find({
    itemStatus: 'approved'
  }).sort({ _id: -1 });
  res.render('items', {
    title: 'Latest items',
    items
  });
}

/**
 * Edit item - Display edit form
 */
exports.editItem = async (req, res, next) => {
  const item = await Item.findOne({ _id: req.params.id });

  /**
   * Check item and user connection
   */
  if((item.author._id.toString() != req.user._id.toString()) && req.user.level > 10){
    return next();
  }

  /**
   * Check item status
   */
  if(item.itemStatus != "new" && req.user.level > 10){
    req.flash("error", "You can't edit an item after it's been approved.");
    res.redirect("back");
    return;
  }

  res.render('itemEdit', {
    title: `Edit ${item.itemName}`,
    item
  });
}

/**
 * Update item data - Save updated data
 */
exports.updateItem = async (req, res) => {
  const item = await Item.findOneAndUpdate({
    _id: req.params.id
  }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  req.flash('success', `🎉 Item data has been updated.`);
  res.redirect(`/item/${item._id}/edit`);
}

/**
 * Display item data
 */
exports.displayItem = async (req, res, next) => {
  const item = await Item.findOne({ itemSlug: req.params.slug });
  if(!item){
    return next();
  }

  if(item.itemStatus == "new"){
    if(!req.user){
      return next();
    }

    if(req.user._id.toString() != item.author._id.toString()){
      return next();
    }
  }

  /**
   * Check user and item connection
   */
  let itemCreatedByUser = false;
  let notEnoughCoins = false;
  let enoughCoins = false;
  let userNotConfirmed = false;
  let alreadyRequested = false;

  if(req.user && req.user._id.toString() == item.author._id.toString()){
    itemCreatedByUser = true;
  }

  // check item price and user coins
  if(req.user && req.user.wallet.length){
    if(req.user.wallet[0].coins >= item.itemPrice){
      enoughCoins = true;
    } else {
      notEnoughCoins = true;
    }
  }

  if(req.user){
    const requests = item.requests.map(obj => obj.toString());
    alreadyRequested = requests.includes(req.user._id.toString()) ? true : false;
  }

  // check account status

  if(req.user && req.user.status !== "confirmed"){
    userNotConfirmed = true;
  }

  res.render('itemDetails', {
    title: item.itemName,
    item,
    itemCreatedByUser,
    enoughCoins,
    notEnoughCoins,
    userNotConfirmed,
    alreadyRequested
  });
}

/**
 * Display item preview
 */
exports.previewItem = async (req, res, next) => {
  const itemToken = req.params.token;
  const itemId = req.params.id;

  const item = await Item.findOne({
    _id: itemId,
    itemToken
  });

  if(!item){
    return next();
  }

  if(item.itemStatus == "new"){
    if(!req.user){
      return next();
    }

    if((req.user._id.toString() != item.author._id.toString()) && req.user.level > 10){
      return next();
    }
  }

  res.render('itemDetails', {
    title: `PREVIEW - ${item.itemName}`,
    preview: true,
    item
  });
}

/**
 * Approve item
 */
exports.approveItem = async (req, res, next) => {
  // check user's level
  if(req.user.level > 10){
    req.flash('error', "You don't have the necessary permissions to approve an item.");
    res.redirect('/');
    return;
  }

  // get item from the database and change status to approved
  const itemToken = req.params.token;
  const itemId = req.params.id;

  const item = await Item.findOneAndUpdate({
    _id: itemId,
    itemToken
  }, {
    itemStatus: 'approved',
    itemPublished: Date.now()
  }, {
    new: true
  }).exec();

  // send notification to user
  const user = {
    name: item.author.name,
    email: item.author.email
  };

  const itemURL = `https://${req.headers.host}/item/${item.itemSlug}`;
  const itemRequestsURL = `https://${req.headers.host}/item/${item._id}/requests`;

  await mail.send({
    user,
    subject: '🎉 You Re-Product has been approved',
    itemURL,
    item,
    itemRequestsURL,
    filename: 'item-approved'
  });

  // redirect to item page
  req.flash('success', `🎉 Product approved`);
  res.redirect(`/item/${item.itemSlug}`);
}

/**
 * Display imates by ctegory
 */
exports.displayCategoryItems = async (req, res) => {
  const itemCategory = req.params.category || 'other';
  const page = req.params.page || 1;
  const itemLimit = 10;
  const skip = (page * itemLimit) - itemLimit;
  const itemsPromise = Item
    .find({
      itemStatus: 'approved',
      itemCategory
    })
    .skip(skip)
    .limit(itemLimit)
    .sort({
      itemCreated: 'desc'
    });
  
  const countPromise = Item.count({
    itemStatus: 'approved',
    itemCategory
  });

  const [items, count] = await Promise.all([itemsPromise, countPromise]);
  const pages = Math.ceil(count / itemLimit);

  // page doesn't exists, redirect to last page
  if(!items.length && skip){
    req.flash('info', `Page ${page} doesn't exists. You've been redirected to page ${pages}`);
    req.redirect(`/category/${itemCategory}/page/${pages}`);
    return;
  }

  let currentCategory = '';
  helper.itemCategories.forEach((category) => {
    if(category.slug == itemCategory)
    currentCategory = `${category.icon} ${category.name}`;
  });

  // render category page
  res.render('category', {
    title: `Items in ${currentCategory}`,
    itemCategory,
    items,
    page,
    pages,
    count
  });
}

/**
 * List items created by the current user
 */
exports.dispalyCreatedItems = async (req, res) => {
  const items = await Item.find({
    author: req.user._id
  }).sort({
    itemCreated: -1
  });

  res.render('created-items', {
    title: 'Uploaded items',
    items,
    displayStatus: true
  });
}

/**
 * List items requested by the current user
 */
exports.displayRequestedItems = async (req, res) => {
  const items = await ItemRequest.find({
    author: req.user._id
  }).sort({
    created: -1
  }).populate('item');

  res.render('requested-items', {
    title: 'Requested items',
    items,
    displayRequestDate: true
  });
}

/**
 * Search items by keyword
 */
exports.searchItems = async (req, res, next) => {
  const items = await Item.find({
    $text: {
      $search: req.query.q
    },
    itemStatus: 'approved'
  }, {
    score: {
      $meta: 'textScore'
    }
  }).sort({
    score: {
      $meta: 'textScore'
    }
  });

  res.render('search-result', {
    title: `Search result for: "${req.query.q}"`,
    items,
    searchTerm: req.query.q
  });
}