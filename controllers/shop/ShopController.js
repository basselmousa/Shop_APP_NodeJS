const Product = require('../../models/product')
exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchById(productId, product => {
        console.log(product)
    });
    res.redirect('/');
}
