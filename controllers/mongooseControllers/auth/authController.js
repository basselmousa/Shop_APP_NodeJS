const bcrypt = require('bcryptjs');

const User = require("../../../models/mongooseModels/user");
exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};
exports.postLogin = (req, res, next) => {

    User.findById('60e847e38559d83b9c4f82de')
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save((err) => {
                console.log(err)
                res.redirect('/');
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12).then(hashedPassword => {
                    const user = new User({
                        password: hashedPassword,
                        email: email,
                        cart: {
                            items: []
                        }
                    });
                    return user.save();
                })
                .then((_) => {
                    res.redirect('/login')
                });

        })

        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/');
    })
}
