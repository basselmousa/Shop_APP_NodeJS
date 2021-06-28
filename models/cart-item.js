const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Cart = require('./cart');

const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    quantaty: Sequelize.INTEGER
});

module.exports = CartItem;
