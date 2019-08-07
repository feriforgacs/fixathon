const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const cmsController = require('../controllers/cmsController');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * Basic pages - Home
 */
router.get('/', cmsController.home);

/**
 * Basic pages - About
 */
router.get('/about', cmsController.about);

/**
 * Basic pages - Privacy Policy
 */
router.get('/privacy-policy', cmsController.privacyPolicy);

/**
 * Basic pages - Terms and Conditions
 */
router.get('/terms-and-conditions', cmsController.termsAndConditions);

/**
 * Basic pages - FAQ
 */
router.get('/faq', cmsController.faq);

/**
 * Basic pages - Contact
 */
router.get('/contact', cmsController.contact);


/**
 * Display all items
 */
router.get('/items', catchErrors(itemController.getItems));

/**
 * Add new item
 */
router.get('/item/add', itemController.addItem);

/**
 * Save new item data
 */
router.post('/item/save/', 
  itemController.upload,
  catchErrors(itemController.resize),
  catchErrors(itemController.createItem)
);

/**
 * Edit existing item - Display form
 */
router.get('/item/:id/edit', catchErrors(itemController.editItem));

/**
 * Save updated item data
 */
router.post('/item/save/:id', 
  itemController.upload,
  catchErrors(itemController.resize),
  catchErrors(itemController.updateItem)
);

/**
 * Display item data
 */
router.get('/item/:slug', catchErrors(itemController.displayItem));

/**
 * Display registration form
 */
router.get('/register', userController.registerForm);

/**
 * Process registration form
 */
router.post('/register', 
  userController.validateRegister,
  catchErrors(userController.createUser),
  authController.login
);

/**
 * User login - Display login form
 */
router.get('/login', userController.loginForm);
 /**
  * User login - Process login data
  */
router.post('/login', authController.login);

/**
 * User logout
 */
router.get('/logout', authController.logout);

/**
 * Display account update form
 */
router.get('/account', 
  authController.isLoggedIn,
  userController.account
);

/**
 * Update account data
 */
router.post('/account',
  authController.isLoggedIn,
  catchErrors(userController.updateAccount)
);

/**
 * Lost password recovery email
 */
router.post('/account/forgot', catchErrors(authController.forgot));

/**
 * Reset password - Display reset form
 */
router.get('/account/reset/:token', catchErrors(authController.reset));

/**
 * Reset password - Save new password
 */
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);

/**
 * Confirm account
 */
router.get('/account/confirm/:token',
  authController.isLoggedIn,
  catchErrors(userController.confirmAccount)
);

/**
 * Account confirmed, display some information
 */
router.get('/confirmed', cmsController.confirmed);

module.exports = router;