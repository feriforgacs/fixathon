const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongodbErrorHandler = require('mongoose-mongodb-errors');

const itemRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: 'ItemRequest - You must supply an item for your request',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now(),
    required: 'ItemRequest - Request creation date is required'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'ItemRequest - You must supply an author for your request',
    trim: true
  },
  status: {
    type: String,
    maxlength: 10,
    default: 'new',
    trim: true,
    required: 'ItemRequest - You must supply a status for your request'
  }
});

function autoPopulate(next){
  this.populate('item');
  this.populate('author');
  next();
}

itemRequestSchema.pre('find', autoPopulate);
itemRequestSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('ItemRequest', itemRequestSchema);