const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const mail = require('../handlers/mail');

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
    created: Date.now(),
    confirmToken: crypto.randomBytes(20).toString('hex')
  });

  const createUserWithPromise = promisify(User.register, User);

  const newUser = await createUserWithPromise(user, req.body.password);

  if(newUser && newUser._doc._id){
    /**
     * Send confirm mail to new user
     */
    const confirmURL = `http://${req.headers.host}/account/confirm/${user.confirmToken}`;
    await mail.send({
      user,
      subject: 'Welcome to Re-Product 🤗 Please, confirm your account',
      confirmURL,
      filename: 'account-confirm'
    });

    req.flash('success', `💌 We've sent an email to <strong>${user.email}</strong>. Please, follow the instructions in that, to confirm your account.`);
  }

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

/**
 * Update existing account
 */
exports.updateAccount = async (req, res) => {
  /**
   * TODO
   * Allow users to update their email address
   * Allow user to update a profile image
   */
  const updates = {
    name: req.body.name,
    userBio: req.body.userBio,
    userContact: req.body.userContact
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  req.flash('success', 'Profile updated!');
  req.login(user);
  res.redirect('/account');
}

/**
 * Confirm registered account
 */
exports.confirmAccount = async (req, res) => {
  const updates = {
    status: 'confirmed',
    confirmedAt: Date.now()
  };
  const user = await User.findOneAndUpdate(
    { 
      _id: req.user._id,
      confirmToken: req.params.token
    },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );

  req.flash('success', `Thank you for confirming your account. Now you can start creating and requesting items 🎉`);
  res.redirect('/confirmed');
}

/**
 * Check if user account is confirmed
 */
exports.isConfirmed = async (req, res, next) => {
  const user = await User.findOne({
    _id: req.user._id
  });

  if(user && user.status == "confirmed"){
    return next();
  }

  res.redirect('/unverified');
}