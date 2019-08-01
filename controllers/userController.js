const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

/**
 * Display registration form
 */
exports.registerForm = (req, res) => {
  res.render('register', {
    title: 'Create your account'
  });
}

/**
 * Validate registration data
 */
exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Please, provide a name.').notEmpty();

  req.checkBody('email', 'Please, provide a valid email address').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.checkBody('email-confirm', 'Emails do not match. Please, check them.').equals(req.body.email);

  req.checkBody('password', 'Please, provide a valid password').notEmpty();
  req.checkBody('password-confirm', 'Please, confirm your password').notEmpty();
  req.checkBody('password-confirm', 'Passwords do not match. Please, check them.').equals(req.body.password);

  req.checkBody('legal', 'Please, accept the terms and conditions to create and account').notEmpty();

  const errors = req.validationErrors();

  if(errors){
    const user = {
      name: req.body.name,
      email: req.body.email,
      'email-confirm': req.body['email-confirm']
    };

    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Create your account',
      flashes: req.flash(),
      user
    });
    return;
  }

  next();
}

/**
 * Create new user
 */
exports.createUser = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    legal: req.body.legal,
    created: Date.now()
  });

  const createUserWithPromise = promisify(User.register, User);

  await createUserWithPromise(user, req.body.password);
  next();
}

/**
 * Display login form
 */
exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Log in'
  });
}

exports.account = (req, res) => {
  res.render('account', {
    title: 'Edit your profile'
  });
}

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  // check user in the db with same email
  const tempUser = await User.findOne({
    email: req.body.email
  });

  if(tempUser && tempUser._id != req.user._id){
    req.flash('error', 'This email address is taken by an other account. Please, use a different one.');
    res.redirect('/account');
    return;
  } else {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    );
  
    req.flash('success', 'Profile updated!');
    res.redirect('/account');
  }
}