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
  status: {
    type: String,
    trim: true,
    default: 'unverified'
  },
  level: {
    type: Number,
    default: 30
  },
  confirmToken: String,
  confirmedAt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.virtual('gravatar').get(function(){
  const hash = md5(this,email);
  return `https://gravatar.cmo/avatar/${hash}?s=100`;
});

userSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  errorMessages: { 
    UserExistsError: 'An account with the selected email address already exists. Please, use an other one.'
  }
});
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);