const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// for gravatar urls
const md5 = require('md5');

const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'We like to know each other 😊 Please, provide a name',
  },
  email: {
    type: String,
    trim: true,
    required: 'Please, provide an email address',
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      'Please, check your email address. It looks invalid.'
    ]
  },
  legal: {
    type: Number,
    trim: true,
    required: 'Please, accept the terms and conditions to create and account'
  },
  created: {
    type: Date
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

module.exports = mongoose.model('User', userSchema);