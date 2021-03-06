const mongodb = require('mongodb');

const Product = require('../../../models/mongooseModels/product')

const {validationResult} = require('express-validator/check');

exports.getProducts = (req, res, next) => {

    Product.find(
        {
            userId: req.user._id
        })
        // .populate('userId')
        .then(products => {
            console.log(products)
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products',
                // isAuthenticated: req.session.isLoggedIn,
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};



exports.getAddProduct = (req, res, next) => {

    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        errorMessage: null,
        validationErrors: [],
        hasError: true,
        product :{
            title: '',
            description: '',
            imageUrl: '',
            price: ''
        },
        // isAuthenticated: req.session.isLoggedIn,
    });
};
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURl = req.body.imageURL;
    const description = req.body.description;
    const price = req.body.price;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false,
            hasError: true,
            product :{
                title: title,
                description: description,
                imageUrl: imageURl,
                price: price
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            // isAuthenticated: req.session.isLoggedIn,
        });

    }

    const product = new Product({
        title: title,
        description: description,
        imageUrl: imageURl,
        price: price,
        userId: req.user
    });
    product.save()
        .then(result => {
            console.log(result)
            res.redirect('/admin/products');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
            // return res.status(500).render('admin/edit-product', {
            //     pageTitle: 'Add Product',
            //     path: '/admin/add-product',
            //     editing: false,
            //     hasError: true,
            //     product :{
            //         title: title,
            //         description: description,
            //         imageUrl: imageURl,
            //         price: price
            //     },
            //     errorMessage: "Database operation fail, please try again later",
            //     validationErrors: []
            //     // isAuthenticated: req.session.isLoggedIn,
            // });
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
                product: product,
                errorMessage: null,
                hasError: true,
                validationErrors: []
                // isAuthenticated: req.session.isLoggedIn,
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageURL = req.body.imageURL;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())

        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product :{
                title: updatedTitle,
                description: updatedDescription,
                imageUrl: updatedImageURL,
                price: updatedPrice,
                _id: productId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
            // isAuthenticated: req.session.isLoggedIn,
        });

    }
    Product.findById(productId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            product.title = updatedTitle;
            product.imageUrl = updatedImageURL;
            product.description = updatedDescription;
            product.price = updatedPrice;
            return product.save()
                .then(result => {
                    console.log("UPDATED PRODUCT");
                    res.redirect('/admin/products')
                });
        })

        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

}
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



exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId
    Product.deleteOne({_id: productId, userId: req.user._id})
        .then(() => {
            console.log("DESTROYED PRODUCT");
            // return req.user.updateCartWhenDeleteProduct(productId);
            res.redirect('/admin/products');
        })
        // .then(result => {
        //     console.log("CART UPDATED");
        //     res.redirect('/admin/products');
        // })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })

}

