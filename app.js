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

const mongoConnect = require('./util/mongoDatabase').mongoConnect;
const User = require('./models/mongoModels/user');
const app = express();
/** End System Require */

/** Start Custom Require*/
const errorsController = require('./controllers/handlingErrors/error')
/** End Custom Require */

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
const adminRoutes = require('./routes/mongoRoutes/admin');
// const shopRoutes = require('./routes/shop');
const shopRoutes = require('./routes/mongoRoutes/shop');
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
 /** Fetch user By Mongo */
app.use((req, res, next) => {
    User.findById('60da5aec39c3ee8d136bd59b')
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
            next();
        });

});
// 60da5aec39c3ee8d136bd59b
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

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


mongoConnect(() =>{
    app.listen(3000);
})
