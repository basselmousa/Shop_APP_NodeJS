exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true';
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedIn
    });
};
exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.redirect('/');
};
