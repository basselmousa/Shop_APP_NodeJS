const express = require('express');
const {check, body} = require('express-validator/check')
const User = require('../../models/mongooseModels/user');
const authController = require('../../controllers/mongooseControllers/auth/authController');
const router = express.Router();

router.get('/login', authController.getLogin);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid Email.')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(user => {
                    if (!user) {
                        return Promise.reject('Invalid Email');
                    }
                });
        })
        .normalizeEmail(),
    body('password', 'Please enter a password with only numbers and test and at least 5 characters')
        .isLength({min: 5})
        .isAlphanumeric()
        .trim()
], authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);

router.post('/signup',
    [check('email')
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, {req}) => {
            // if (value === 'test@test.com') {
            //     throw new Error('This email address is forbidden.');
            // }
            // return true;
            return User.findOne({email: value})
                .then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email already exists, please pick a different one.');
                    }
                });
        })
        .normalizeEmail(),
        body('password', 'Please enter a password with only numbers and test and at least 5 characters')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),
        body('confirmPassword', 'Password does not matched.')
            .trim()
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    // throw new Error('Password does not matched.');
                    return false;
                }
                return true;
            })
    ],
    authController.postSignup);

router.get('/reset', authController.getResetPassword);

router.post('/reset', authController.postResetPassword);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
