const Order = require('../../models/order')
exports.getOrdersMethod = (req, res, next) => {
    req.user.getOrders({include:['products']})
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
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = {quantity: product.cartItem.quantaty}
                        return product;
                    }))
                })
                .catch(err => {
                    console.log(err)
                });

        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
};
