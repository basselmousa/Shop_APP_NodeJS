

exports.getCarts =(req, res, next)=> {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
}
