

exports.getCheckout = (req, res, next)=>{
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}
