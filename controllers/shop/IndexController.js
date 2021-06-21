const Product = require("../../models/product");


exports.getIndex = (req, res, next) =>{
    Product.fetchAll()
        .then(([rows, fieldData]) =>{
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/',
            });
        })
        .catch(err => console.log(err));

}
