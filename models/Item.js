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
  },
  itemToken: {
    type: String,
    trim: true
  },
  itemStatus: {
    type: String,
    default: 'new'
  },
  itemCreated: Date,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user'
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// define our indexes
itemSchema.index({
  name: 'text',
  description: 'text'
});

itemSchema.pre('save', async function(next){
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

  const slugRegEx = new RegExp(`^(${this.itemSlug})((-[0-9]*$)?)$`, 'i');
  const itemsWithSameSlug = await this.constructor.find({ itemSlug: slugRegEx });

  if(itemsWithSameSlug.length) {
    this.itemSlug = `${this.itemSlug}-${itemsWithSameSlug.length + 1}`;
  }

  next();
});

function autoPopulate(next){
  this.populate('author');
  next();
}

itemSchema.pre('find', autoPopulate);
itemSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Item', itemSchema);