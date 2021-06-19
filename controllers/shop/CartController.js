const Product = require('../../models/product')
const Cart = require('../../models/cart')
exports.getCarts =(req, res, next)=> {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}


exports.postCart = (req, res, next) =>{
                        /**
                         *  BODY For Post
                         *  PARAMS For URL Passed Data
                         */
    const productId  = req.body.productId;


    Product.fetchById(productId, product =>{
        Cart.addProduct(productId, product.price)
    })

    res.redirect('/cart');

}
