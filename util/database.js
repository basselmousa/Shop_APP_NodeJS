const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs-shop-app','root','bassel99',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
/**
 * Old Way To Connect
 *
const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs-shop-app',
    password: 'bassel99'

});

module.exports = pool.promise();
*/


