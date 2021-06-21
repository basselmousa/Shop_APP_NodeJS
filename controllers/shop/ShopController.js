const Product = require('../../models/product')
exports.getProducts = (req, res, next) => {
     Product.fetchAll()
        .then(([rows, fieldData]) =>{
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch(err => console.log(err));

};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchById(productId).then(([rows, fieldData]) =>{
        res.render('shop/product-detail', {
            product: rows[0],
            pageTitle: rows.title,
            path: '/product-detail/' + productId ,
        });
    }).catch(err => console.log(err));

}
