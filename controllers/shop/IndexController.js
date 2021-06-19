const Product = require("../../models/product");


exports.getIndex = (req, res, next) =>{
    Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/',
        });
    });

}
