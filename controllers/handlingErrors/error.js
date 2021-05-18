exports.notFound404Error = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found',
        path: req.URL,
    });
};
