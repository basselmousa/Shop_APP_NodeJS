const Order = require('../../../models/mongoModels/order');
exports.getOrdersMethod = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            console.log(orders[0].products)
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders
            });

        })
        .catch(err => {
            console.log(err)
        });
};


exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user.addOrder()
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
};
