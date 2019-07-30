const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
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
router.post('/item/save/', catchErrors(itemController.createItem));

/**
 * Edit existing item - Display form
 */
router.get('/item/:id/edit', catchErrors(itemController.editItem));

/**
 * Save updated item data
 */
router.post('/item/save/:id', catchErrors(itemController.updateItem));

/**
 * Display item data
 */
router.get('/item/:id', catchErrors(itemController.displayItem));

module.exports = router;