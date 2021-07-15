const Product = require('../../../models/mongooseModels/product')
// const User = require('../../../models/mongooseModels/user')
exports.getCarts = (req, res, next) => {
    // console.log(req.session.user)
    // let user = User.find({_id: req.session.user._id});
    // let user = req.session.user;
    // console.log(req.session.user)
    req.session.user.populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user.cart.items)
            let cartProducts = user.cart.items;
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            console.log(err)
        });
    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (const product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({productData :product, qty: cartProductData.qty})
    //             }
    //         }
    //         res.render('shop/cart', {
    //             pageTitle: 'Your Cart',
    //             path: '/cart',
    //             products : cartProducts
    //         });
    //     });
    // });

};

exports.postCart = (req, res, next) => {

    const productId = req.body.productId;

    Product.findById(productId)
        .then(product => {
            return req.session.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });


    // let fetchedCart;
    // let newQuantity = 1;
    // req.user.getCart()
    //     .then(cart => {
    //         fetchedCart = cart;
    //         return cart.getProducts({
    //             where: {
    //                 id: productId
    //             }
    //         });
    //     })
    //     .then(cartProducts => {
    //         let product;
    //         if (cartProducts.length > 0) {
    //             product = cartProducts[0];
    //         }
    //
    //         if (product) {
    //             const oldQuantity = product.cartItem.quantaty;
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(productId);
    //
    //     })
    //     .then(product => {
    //         return fetchedCart.addProduct(product, {
    //             through: {
    //                 quantaty: newQuantity
    //             }
    //         })
    //     })
    //     .then(() => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    /** Old Way Without Sequelize */
    /**
     *  BODY For Post
     *  PARAMS For URL Passed Data
     */

    /*  const productId = req.body.productId;

      Product.fetchById(productId, product => {
          Cart.addProduct(productId, product.price)
      })

      res.redirect('/cart');*/
};

exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;

    req.session.user.deleteCartItem(productId)
        // .then(cart => {
        //     return cart.getProducts({
        //         where: {
        //             id: productId
        //         }
        //     });
        // })
        // .then(products => {
        //     const product = products[0];
        //     return product.cartItem.destroy();
        // })
        .then(result => {
            res.redirect('cart');
        })
        .catch(err => {
            console.log(err)
        });

    // Product.fetchById(productId, (product) => {
    //     Cart.deleteProduct(productId, product.price);
    // });


};
