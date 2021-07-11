/** Start System Require */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

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
/** End System Require */

/** Start Custom Require*/
const errorsController = require('./controllers/handlingErrors/error')
/** End Custom Require */

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
const adminRoutes = require('./routes/mongooseRoutes/admin');
// const shopRoutes = require('./routes/shop');
const shopRoutes = require('./routes/mongooseRoutes/shop');
const authRoutes = require('./routes/mongooseRoutes/auth');
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
app.use((req, res, next) => {
    User.findById('60e847e38559d83b9c4f82de')
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        });

});
// 60e25e63f86afee8c4ec77dc


/**
 *  For Mongoose
 */

const User = require('./models/mongooseModels/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

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
}).then(result =>{
    console.log('CONNECTED BY MONGOOSE');
    User.findOne()
        .then(user=>{
            if (!user){
                const user = new User({
                    name: 'Bassel',
                    email: 'bassel@bassel.com',
                    cart: {
                        items:[],
                    }
                });
                user.save();
            }
        });


    app.listen(3000);
}).catch(err =>{
    console.log(err)
})
