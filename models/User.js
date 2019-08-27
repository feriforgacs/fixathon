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
    maxlength: 100
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
    ],
    maxlength: 100
  },
  userBio: {
    type: String,
    maxlength: 200
  },
  userContact: {
    type: String,
    maxlength: 200
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
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('gravatar').get(function(){
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=50`;
});

userSchema.virtual('wallet', {
  ref: 'Wallet',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.plugin(passportLocalMongoose, { 
  usernameField: 'email', 
  errorMessages: { 
    UserExistsError: 'An account with the selected email address already exists. Please, use an other one.'
  }
});

userSchema.plugin(mongodbErrorHandler);

function autoPopulate(next){
  this.populate('wallet');
  next();
}

userSchema.pre('find', autoPopulate);
userSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('User', userSchema);