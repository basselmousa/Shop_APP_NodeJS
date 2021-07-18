const Product = require("../../../models/mongooseModels/product");


exports.getIndex = (req, res, next) =>{
    console.log(req.user)
    Product.find()
        .then(products =>{
            res.render('shop/index', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',
                // isAuthenticated: req.session.isLoggedIn,
                // csrfToken: req.csrfToken(),
            });
        })
        .catch(err => console.log(err));

}
