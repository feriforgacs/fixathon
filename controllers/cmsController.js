const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const helpers = require('../helpers');


/**
 * Homepage
 */
exports.home = async (req, res) => {
  /**
   * Get latest items for homepage
   */
  const items = await Item.find({
    itemStatus: 'approved'
  }).sort({
    itemPublished: -1
  }).limit(5);

  res.render('home', {
    title: `${helpers.siteName} - ${helpers.siteTitle}`,
    items
  });
}

/**
 * About page
 */
exports.about = (req, res) => {
  res.render('about', {
    title: 'About'
  });
}

/**
 * Privacy Policy
 */
exports.privacyPolicy = (req, res) => {
  res.render('privacy-policy', {
    title: 'Privacy Policy'
  });
}

/**
 * Terms and Conditions
 */
exports.termsAndConditions = (req, res) => {
  res.render('terms-and-conditions', {
    title: 'Terms and Conditions'
  });
}

/**
 * FAQ
 */
exports.faq = (req, res) => {
  res.render('faq', {
    title: 'FAQ'
  });
}

/**
 * Contact
 */
exports.contact = (req, res) => {
  res.render('contact', {
    title: 'Get in touch'
  });
}

/**
 * Confirmed account
 */
exports.confirmed = (req, res) => {
  res.render('confirmed', {
    title: 'Things you can do with a confirmed account'
  });
}

/**
 * Unverified account
 */
exports.unverified = (req, res) => {
  res.render('unverified', {
    title: 'Please, verify your profile'
  });
}