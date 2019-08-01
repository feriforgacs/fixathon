const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Invalid login details. Please, try again.',

  successRedirect: '/',
  successFlash: 'Hi there.'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', '👋 Bye');
  res.redirect('/');
}

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
    return;
  }

  req.flash('error', 'Please, log in to view this page');
  res.redirect('/login');
}

exports.forgot = async (req, res) => {
  // check user in the database
  const user = await User.findOne({ email: req.body.email });

  // there is no user in the database with that email
  if(!user){
    req.flash('error', `There is no user in the database with the following email address: ${req.body.email}`);
    res.redirect('/login');
    return;
  }

  // set user token and user token expiry date
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

  // update user in the database
  await user.save();

  // send email with the token
  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;

  await mail.send({
    user,
    subject: 'Reset your password',
    resetURL,
    filename: 'password-reset'
  });

  req.flash('success', `Password reset mail has been sent to ${req.body.email}`);

  // redirect to login
  res.redirect('/login');
}