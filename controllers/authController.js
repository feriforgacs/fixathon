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

/**
 * Display password reset form
 */
exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });

  /**
   * Invalid or expired token
   */
  if(!user){
    req.flash('error', 'Reset token invalid or expired');
    res.redirect('/login');
    return;
  }

  res.render('reset', {
    title: 'Create new password'
  });
}

exports.confirmedPasswords = (req, res, next) => {
  if(req.body.password === req.body['password-confirm']){
    next();
    return;
  }

  req.flash('error', 'Password do not match');
  res.redirect('back');
}

/**
 * Save new passwords
 */
exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });

  /**
   * Invalid or expired token
   */
  if(!user){
    req.flash('error', 'Reset token invalid or expired');
    res.redirect('/login');
    return;
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  const updatedUser = await user.save();
  await req.login(updatedUser);

  req.flash('success', 'Your password has been updated and you are now logged in.');
  res.redirect('/');
}