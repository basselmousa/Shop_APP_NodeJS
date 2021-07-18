const path = require('path');

const express = require('express');

const adminProductController = require('../../controllers/mongooseControllers/admin/ProductsController');

const isAuth = require('../../middleware/mongooseMiddleware/is-auth');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product',isAuth, adminProductController.getAddProduct);

// /admin/products => GET
router.get('/products',isAuth, adminProductController.getProducts);
//
// // /admin/add-product => POST
router.post('/add-product',isAuth, adminProductController.postAddProduct);
//
router.get('/edit-product/:id',isAuth, adminProductController.getEditProduct);
// //
router.post('/edit-product',isAuth, adminProductController.postEditProduct);
// //
router.post('/delete-product',isAuth, adminProductController.deleteProduct);

module.exports = router;

