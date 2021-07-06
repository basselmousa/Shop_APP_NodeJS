const Product = require('../../../models/mongoModels/product')
exports.getProducts = (req, res, next) => {

    Product.fetchAll()
        .then(products =>{
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
            });
        })
        .catch(err =>{
            console.log(err)
        });
    /**
     * Old Way Without Sequelize
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render('shop/product-list', {
    //             prods: rows,
    //             pageTitle: 'All Products',
    //             path: '/products',
    //         });
    //     })
    //     .catch(err => console.log(err));
     */

};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then(product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'product.title',
            path: '/product-detail/' + productId,
        });
    }).catch(err => console.log(err));

}
