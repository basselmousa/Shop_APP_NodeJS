const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require("../../../models/mongooseModels/user");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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',
    }
}));
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
                .hash(password, 12)
                .then(hashedPassword => {
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
                    return transporter.sendMail({
                        to: email,
                        from: '3170601041@std.wise.edu.jo',
                        subject: 'Signup Completed',
                        html: '<h1> You Successfully signed up </h1>'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
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

exports.getResetPassword = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    res.render('auth/password-reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message,
        // isAuthenticated: false,
        // csrfToken: req.csrfToken()
    })
}

exports.postResetPassword = (req, res, next) => {
    crypto.randomBytes(32, (err, buf) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buf.toString('hex');
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found.');
                    return res.redirect('/reset');
                }

                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                console.log(result)
                res.redirect('/');
                transporter.sendMail({
                    to: result.email,
                    from: '3170601041@std.wise.edu.jo',
                    subject: 'Password Reset',
                    html: `
                    <p>You request a password reset</p>
                    <p>Clock this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p> 
                    `
                }).then(res => {
                    console.log("then " + res);
                }).catch(err => {
                    console.log("catch " + err)
                });
            })
            .catch(err => {
                console.log("err");
            });
    });
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
        .then(user => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'New Password',
                errorMessage: message,
                userId: user._id.toString(),
                passwordToken: token,
                // isAuthenticated: false,
                // csrfToken: req.csrfToken()
            });
        })
        .catch(err => {
            console.log(err)
        });
}
exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let oldUser ;
    User.findOne(
        {
            resetToken: passwordToken,
            resetTokenExpiration: {$gt: Date.now()},
            _id: userId
        })
        .then(user => {
            oldUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then(hashedPassword =>{
            oldUser.password = hashedPassword;
            oldUser.resetToken = undefined;
            oldUser.resetTokenExpiration = undefined;
            return oldUser.save();
        })
        .then(result =>{
            console.log("Reseated")
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err)
        })
};
