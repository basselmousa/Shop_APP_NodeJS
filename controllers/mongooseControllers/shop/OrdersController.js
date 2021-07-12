const Product = require('../../../models/mongooseModels/product');
const Order = require('../../../models/mongooseModels/order');
exports.getOrdersMethod = (req, res, next) => {

    Order.find({"user.userId" : req.user._id})
        .then(orders => {
            console.log(orders)
            res.render('shop/mongooseOrders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders,
                isAuthenticated: req.isLoggedIn
            });

        })
        .catch(err => {
            console.log(err)
        });

};


exports.postOrders = (req, res, next) => {

    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products = user.cart.items.map(item =>{
                return {quantity: item.quantity, product: { ...item.productId._doc }}
            });
            const order = new Order({
                user: {
                    name : req.user.name,
                    userId: req.user._id
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() =>{
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
};
