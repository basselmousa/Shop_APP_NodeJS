const Product = require("../../../models/mongooseModels/product");


exports.getIndex = (req, res, next) =>{
    Product.find()
        .then(products =>{
            res.render('shop/index', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',
                isAuthenticated: req.isLoggedIn
            });
        })
        .catch(err => console.log(err));

}
