/** Start System Require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

/**
 * Sequelize Definition

 const sequelize = require('./util/database');


 const User = require('./models/user');
 const relations = require('./realations');

 */

// const mongoConnect = require('./util/mongoDatabase').mongoConnect;
// const User = require('./models/mongoModels/user');
const app = express();
const mongoose = require('mongoose');
const store = new MongoDBStore({
    uri: 'mongodb+srv://bassel:aOvzzLNTzxs9Jj5G@node-js-shop-app.q8aa6.mongodb.net/shop?retryWrites=true&w=majority',
    collection: 'sessions'
});
/** End System Require */

/** Start Custom Require*/
const errorsController = require('./controllers/handlingErrors/error')
/** End Custom Require */

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
const adminRoutes = require('./routes/mongooseRoutes/admin');
// const shopRoutes = require('./routes/shop');
const shopRoutes = require('./routes/mongooseRoutes/shop');
const authRoutes = require('./routes/mongooseRoutes/auth');

const GLOBAL_PROPERTIES = require('./helpers/globalVariablesForAllViews')

/**
 * Create Dummy User With Sequelize
 app.use((req, res, next) => {
    User.findByPk(1)
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        });
});
 */
/** Fetch user By Mongo And Mongoose */
// app.use((req, res, next) => {
//     User.findById('60e847e38559d83b9c4f82de')
//         .then(user=>{
//             req.user = user;
//             next();
//         })
//         .catch(err => {
//             console.log(err);
//             next();
//         });
//
// });
// 60e25e63f86afee8c4ec77dc

/** Fetch user By Session */

/**
 *  For Mongoose
 */

const User = require('./models/mongooseModels/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my secret', // in production should be a long string value
    resave: false,
    saveUninitialized: false,
    store: store
}));
/** After Initializing Sessions Initialize CSRF Middleware */

app.use(csrfProtection)

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    console.log(req.session)
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            // console.log(err);

        });

});

app.use(GLOBAL_PROPERTIES);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorsController.notFound404Error);


// {force:true}
/**
 * Sequelize Sync Tables
 sequelize.sync()
 .then(result => {
        // console.log(result)
        return User.findByPk(1);
    })
 .then(user => {
        if (!user) {
            return User.create({
                name: 'Bassel',
                email: 'bassel@bassel.com'
            });
        }
        // return Promise.resolve(user);
        // Every things Returned in Then Block Converted To Promise
        return user;
    })
 .then(user => {
        // console.log(user);
        return user.createCart();
    })
 .then(cart =>{
        app.listen(3000);
    })
 .catch(err => {
        console.log(err)
    });

 */

/**
 * Mongo Connect
 mongoConnect(() =>{
    app.listen(3000);
})

 */

/**
 * Mongoose Connect
 */

mongoose.connect('mongodb+srv://bassel:aOvzzLNTzxs9Jj5G@node-js-shop-app.q8aa6.mongodb.net/shop?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(result => {
    console.log('CONNECTED BY MONGOOSE');
    app.listen(3000);
}).catch(err => {
    console.log(err)
})
