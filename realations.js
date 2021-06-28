const User = require('./models/user');
const Product = require('./models/product');
const OrderItem = require('./models/order-item');

const Order = require('./models/order')

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.hasMany(Product);

Order.belongsTo(User);

User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
