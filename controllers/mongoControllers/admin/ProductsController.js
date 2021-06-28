const mongodb = require('mongodb');

const Product = require('../../../models/mongoModels/product')
const ObjectId = mongodb.ObjectID;
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
            });
        })
        .catch(err => console.log(err));
};


exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit

    if (!editMode) {
        return res.redirect('/')
    }
    const productId = req.params.id
    Product.findById(productId)
        // Product.findByPk(productId)
        .then((product) => {
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
    const product = new Product(title, price, description, imageURl);
    product.save()
        .then(result => {
            console.log(result)
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err)
        });
    // req.user.createProduct({
    //     title: title,
    //     description: description,
    //     imageUrl: imageURl,
    //     price: price,
    // })
    //     .then(result => {
    //         console.log(result)
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     });
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
/*

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
*/
exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const product = new Product(updatedTitle, updatedPrice, updatedDescription, updatedImageURL, new ObjectId(productId))
    product.save()
        .then(result => {
            console.log("UPDATED PRODUCT");
            res.redirect('/admin/products')
        }).catch(err => {
        console.log(err);
    });

}


exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteById(productId)
        .then(() => {
            console.log("DESTROYED PRODUCT");
            res.redirect('/admin/products')
        })
        .catch(err => {
            console.log(err);
        })

}

