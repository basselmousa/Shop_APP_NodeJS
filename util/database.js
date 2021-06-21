const mysql = require('mysql2')
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs-shop-app',
    password: 'bassel99'

});

module.exports = pool.promise();
