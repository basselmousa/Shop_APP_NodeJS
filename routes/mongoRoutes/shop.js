const express = require('express');

const shopController = require('../../controllers/mongoControllers/shop/ShopController');
const cartController = require('../../controllers/mongoControllers/shop/CartController');
// const ordersController = require('../../controllers/mongoControllers/shop/OrdersController');
const indexController = require('../../controllers/mongoControllers/shop/IndexController');
// const checkoutController = require('../../controllers/mongoControllers/shop/CheckoutController');
const router = express.Router();

router.get('/', indexController.getIndex);


router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);
//
//
router.get('/cart', cartController.getCarts)
router.post('/cart', cartController.postCart)
router.post('/cart-delete-item', cartController.deleteCartItem)
//
//
// router.get('/orders', ordersController.getOrdersMethod)
// router.post('/create-order', ordersController.postOrders);
//
// router.get('/checkout', checkoutController.getCheckout)

module.exports = router;
