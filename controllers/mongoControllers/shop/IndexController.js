const Product = require("../../../models/mongoModels/product");


exports.getIndex = (req, res, next) =>{
    Product.fetchAll()
        .then(products =>{
            res.render('shop/index', {
                prods: products,
                pageTitle: 'All Products',
                path: '/',
            });
        })
        .catch(err => console.log(err));

}
