const express = require('express');

const shopController = require('../controllers/shop/ShopController');
const cartController = require('../controllers/shop/CartController')
const ordersController = require('../controllers/shop/OrdersController')
const indexController = require('../controllers/shop/IndexController')
const checkoutController = require('../controllers/shop/CheckoutController')
const router = express.Router();

router.get('/', indexController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);
router.get('/cart', cartController.getCarts)
router.get('/orders', ordersController.getOrders)
router.get('/checkout', checkoutController.getCheckout)

module.exports = router;
