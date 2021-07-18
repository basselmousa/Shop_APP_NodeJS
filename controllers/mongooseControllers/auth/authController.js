const bcrypt = require('bcryptjs');

const User = require("../../../models/mongooseModels/user");
exports.getLogin = (req, res, next) => {

    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        // isAuthenticated: false,
        // csrfToken: req.csrfToken()
    });
};
exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            if (!user){
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch =>{
                    if (doMatch){
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        req.session.save((err) => {
                            console.log(err)
                            res.redirect('/');
                        })
                    }
                    else{
                        res.redirect('/login');
                    }
                })
                .catch(err =>{
                    console.log(err);
                    res.redirect('/login');
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
