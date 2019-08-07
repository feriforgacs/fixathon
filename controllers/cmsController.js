/**
 * Homepage
 */
exports.home = (req, res) => {
  res.render('home', {
    title: 'Home'
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