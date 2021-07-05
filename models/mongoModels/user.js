const getDb = require('../../util/mongoDatabase').getDb;
const mongodb = require('mongodb')
const PRODUCTSCOLLECTIONNAME = require('./product').COLLECTION_NAME;
class User {
    name;
    email;
    cart;
    static COLLECTION_NAME = "users";
    _id;

    constructor(username, email, cart, id) {
        this.cart = cart ? cart : {items:[]};
        this.name = username;
        this.email = email;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection(User.COLLECTION_NAME).insertOne(this);

    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp =>{
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >=0){
            newQuantity = this.cart.items[cartProductIndex].quantity +1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else{
            updatedCartItems.push({productId: new mongodb.ObjectID(product._id), quantity: newQuantity})
        }

        const updatedCart = {items: updatedCartItems}
        const db = getDb();
        return db.collection(User.COLLECTION_NAME)
            .updateOne(
                {
                    _id: new mongodb.ObjectID(this._id)
                },
                {
                    $set:
                        {
                            cart: updatedCart
                        }
                });
    }

    getCart(){
        const db = getDb();
        const productIds = this.cart.items.map(item =>{
            return item.productId;
        })
        return db.collection(PRODUCTSCOLLECTIONNAME)
            .find({_id: {$in:productIds}})
            .toArray()
            .then(products =>{
                return products.map(product =>{
                    return {...product, quantity:this.cart.items.find(item =>{
                        return item.productId.toString() === product._id.toString();
                        }).quantity
                    }
                });
            });
    }

    deleteCartItem(productId){
        const updatedCartItem = this.cart.items.filter(item=>{
            return productId.toString() !== item.productId.toString();
        });
        const db = getDb();
        return db.collection(User.COLLECTION_NAME)
            .updateOne(
                {
                    _id: new mongodb.ObjectID(this._id)
                },
                {
                    $set:
                        {
                            cart: {items:updatedCartItem}
                        }
                });

    }

    static findById(userId) {
        const db = getDb();
        return db.collection(User.COLLECTION_NAME)
            .findOne({_id: new mongodb.ObjectID(userId)});
    }
}

module.exports = User;
