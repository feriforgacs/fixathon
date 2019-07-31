const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Create your account'
  });
}