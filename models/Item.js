const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    trim: true,
    required: 'Please, enter an item name.'
  },
  itemSlug: String,
  itemDescription: {
    type: String,
    trim: true,
    required: 'Please, enter an item description.'
  },
  itemCategory: {
    type: Number,
    required: 'Please, select a category.'
  },
  itemPhoto: {
    type: String,
    required: 'Please, select a photo for your item'
  }
});

itemSchema.pre('save', function(next){
  /**
   * Name hasn't changed, go to next
   */
  if(!this.isModified('itemName')){
    return next();
  }

  /**
   * Generate slug from name
   */
  this.itemSlug = slug(this.itemName);
  next();
});

module.exports = mongoose.model('Item', itemSchema);