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
    req.user.getProducts({
        where: {
            id: productId
        }
    })
    // Product.findByPk(productId)
        .then((products) => {
            const product = products[0];
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
        .catch(err => {
            console.log(err)
        });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURl = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;

    req.user.createProduct({
        title: title,
        description: description,
        imageUrl: imageURl,
        price: price,
    })
        .then(result => {
            console.log(result)
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
    /**
     * Without helper function from sequelize
     Product.create({
        title: title,
        description: description,
        imageUrl: imageURl,
        price: price,
        userId: req.user.id
    }).then(result => {
        console.log(result)
        res.redirect('/admin/products');
    })
     .catch(err => {
            console.log(err)
        });*/
    /**
     * Old Way Without Sequelize
     const product = new Product(null, title, imageURl, description, price)
     product.save()
     .then(() => {
            res.redirect('/');
        })
     .catch(err => console.log(err));
     */

};

exports.getProducts = (req, res, next) => {
    req.user.getProducts() 
    // Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
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
    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle;
            product.imageUrl = updatedImageURL;
            product.description = updatedDescription;
            product.price = updatedPrice;
            return product.save();
        }).then(result => {
        console.log("UPDATED PRODUCT");
        res.redirect('/admin/products')
    }).catch(err => {
        console.log(err);
    });

}

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log("DESTROYED PRODUCT");
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err);
        })

}
