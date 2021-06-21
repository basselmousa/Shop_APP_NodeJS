const Product = require('../../models/product')
const Cart = require('../../models/cart')
exports.getCarts = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (const product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData :product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products : cartProducts
            });
        });
    });

};

exports.postCart = (req, res, next) => {
    /**
     *  BODY For Post
     *  PARAMS For URL Passed Data
     */
    const productId = req.body.productId;

    Product.fetchById(productId, product => {
        Cart.addProduct(productId, product.price)
    })

    res.redirect('/cart');
};

exports.deleteCartItem = (req, res, next) =>{
    const productId = req.body.productId;
    Product.fetchById(productId, (product) =>{
        Cart.deleteProduct(productId, product.price);
        res.redirect('cart');
    });
};
