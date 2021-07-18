const bcrypt = require('bcryptjs');

const User = require("../../../models/mongooseModels/user");
exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: message
        // isAuthenticated: false,
        // csrfToken: req.csrfToken()
    });
};
exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid Email')
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        req.session.save((err) => {
                            console.log(err)
                            res.redirect('/');
                        })
                    } else {
                        req.flash('error', 'Invalid Password')

                        res.redirect('/login');
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                })

        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message,
        // isAuthenticated: false,
        // csrfToken: req.csrfToken()
    });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email already exists, please pick a different one.')
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
