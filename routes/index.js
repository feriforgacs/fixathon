const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

/**
 * Display homepage
 */
router.get('/', (req, res) => {
  res.render('index', {
    title: "Home page"
  })
});

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

module.exports = router;