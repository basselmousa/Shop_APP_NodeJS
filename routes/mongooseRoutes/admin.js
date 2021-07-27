const path = require('path');

const express = require('express');

const {body} = require('express-validator/check');

const adminProductController = require('../../controllers/mongooseControllers/admin/ProductsController');

const isAuth = require('../../middleware/mongooseMiddleware/is-auth');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product',isAuth, adminProductController.getAddProduct);

// /admin/products => GET
router.get('/products',isAuth, adminProductController.getProducts);
//
// // /admin/add-product => POST
router.post('/add-product',isAuth, [
    body('title')
        .isLength({min: 3, max: 255})
        .withMessage('Title Is Required and have to be between 3 and 255 character')
        .isString()

        .trim(),
    body('imageURL')
        .isURL()
        .withMessage('Image Url Is required'),
    body('description')
        .isLength({min: 10, max: 4000})
        .trim()
        .withMessage('Description is required and have to be between 10 and 4000 character'),
    body('price')
        .isFloat()
        .withMessage('Price Is Required and have to be just numbers')
],adminProductController.postAddProduct);
//
router.get('/edit-product/:id',isAuth, adminProductController.getEditProduct);
// //
router.post('/edit-product',isAuth, [
    body('title')
        .isLength({min: 3, max: 255})
        .withMessage('Title Is Required and have to be between 3 and 255 character')
        .isString()
        .trim(),
    body('imageURL')
        .isURL()
        .withMessage('Image Url Is required'),
    body('description')
        .isLength({min: 10, max: 4000})
        .trim()
        .withMessage('Description is required and have to be between 10 and 4000 character'),
    body('price')
        .isFloat()
        .withMessage('Price Is Required and have to be just numbers')
],adminProductController.postEditProduct);
// //
router.post('/delete-product',isAuth, adminProductController.deleteProduct);

module.exports = router;

