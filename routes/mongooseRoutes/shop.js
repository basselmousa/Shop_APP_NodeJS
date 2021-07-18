const express = require('express');

const shopController = require('../../controllers/mongooseControllers/shop/ShopController');
const cartController = require('../../controllers/mongooseControllers/shop/CartController');
const ordersController = require('../../controllers/mongooseControllers/shop/OrdersController');
const indexController = require('../../controllers/mongooseControllers/shop/IndexController');
// const checkoutController = require('../../controllers/mongoControllers/shop/CheckoutController');

const isAuth = require('../../middleware/mongooseMiddleware/is-auth');

const router = express.Router();

router.get('/', indexController.getIndex);


router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);
//
//
router.get('/cart',isAuth, cartController.getCarts)
router.post('/cart',isAuth, cartController.postCart)
router.post('/cart-delete-item',isAuth, cartController.deleteCartItem)
//
//
router.get('/orders',isAuth, ordersController.getOrdersMethod)
router.post('/create-order',isAuth, ordersController.postOrders);
//
// router.get('/checkout', checkoutController.getCheckout)

module.exports = router;
