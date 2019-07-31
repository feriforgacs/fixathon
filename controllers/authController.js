const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const passport = require('passport');
const crypto = require('crypto');
const promisify = require('es6-promisify');

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