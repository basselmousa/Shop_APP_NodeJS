const Product = require("../../models/product");


exports.getIndex = (req, res, next) =>{
    Product.findAll()
        .then(products =>{
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',
            });
        })
        .catch(err => console.log(err));

}
