const mongoose = require('mongoose');
const Item = mongoose.model('Item');

/**
 * Add new item - Display form
 */
exports.addItem = (req, res) => {
  res.render('itemEdit', {
    title: 'Add New Item'
  });
};

/**
 * Save new item to database
 */
exports.createItem = async (req, res) => {
  const item = await (new Item(req.body)).save();
  req.flash('success', `🎉 Successfully created ${item.itemName}. We'll review it soon (24-48 hours) and send you and email when it's live.`);
  res.redirect(`/item/${item._id}`);
}

/**
 * Get items from the database
 */
exports.getItems = async (req, res) => {
  const items = await Item.find();
  res.render('items', {
    title: 'Latest items',
    items
  })
}

/**
 * Edit item - Display edit form
 */
exports.editItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });
  res.render('itemEdit', {
    title: `Edit ${item.itemName}`,
    item
  })
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

  req.flash('success', `Successfully updated ${item.itemName}.`);
  res.redirect(`/item/${item._id}/edit`);
}

/**
 * Display item data
 */
exports.displayItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id });
  res.render('itemDetails', {
    title: item.itemName,
    item
  })
}