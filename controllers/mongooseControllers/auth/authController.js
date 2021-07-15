const User = require("../../../models/mongooseModels/user");
exports.getLogin = (req, res, next) => {

    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};
exports.postLogin = (req, res, next) => {

    User.findById('60e847e38559d83b9c4f82de')
        .then(user=>{
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};
