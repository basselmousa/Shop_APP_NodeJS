const path = require('path');

const express = require('express');

const adminProductController = require('../controllers/admin/ProductsController');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', adminProductController.getAddProduct);

// /admin/products => GET
router.get('/products', adminProductController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminProductController.postAddProduct);

router.get('/edit-product/:id', adminProductController.getEditProduct)

router.post('/edit-product', adminProductController.postEditProduct)

module.exports = router;

