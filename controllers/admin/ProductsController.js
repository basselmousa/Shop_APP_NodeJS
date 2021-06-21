const Product = require('../../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit

    if (!editMode) {
        return res.redirect('/')
    }
    const productId = req.params.id
    Product.fetchById(productId, (product) => {
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })

};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURl = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price
    const product = new Product(null, title, imageURl, description, price)
    product.save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));


};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('admin/products', {
                prods: rows,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
        .catch(err => console.log(err));

};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;
    const product = new Product(productId, updatedTitle, updatedImageURL, updatedDescription, updatedPrice)
    product.save();
    console.log(productId)
    res.redirect('/admin/products')
}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteProduct(productId)
    res.redirect('/admin/products')
}
