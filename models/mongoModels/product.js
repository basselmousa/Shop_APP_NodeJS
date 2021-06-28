const mongodb = require('mongodb');
const getDb = require('../../util/mongoDatabase').getDb;

// import {getDb} from '../../util/mongoDatabase';
class Product {
    static  COLLECTION_NAME = 'products';
    title;
    _id;
    price;
    description;
    imageUrl;

    constructor(title, price, description, imageUrl, _id = null) {
        this._id = _id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;

    }

    save() {
        const db = getDb();
        let dbOperation;
        if (this._id) {
            // update
            dbOperation = db.collection(Product.COLLECTION_NAME)
                .updateOne({
                    _id : new mongodb.ObjectID(this._id)
                }, {$set : this});
        } else {
            dbOperation = db.collection(Product.COLLECTION_NAME)
                .insertOne(this);

        }
        return dbOperation
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    };

    static fetchAll() {
        const db = getDb();
        return db.collection(Product.COLLECTION_NAME)
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    };

    static findById(productId) {
        const db = getDb();
        return db.collection('products')
            .find({
                _id: new mongodb.ObjectID(productId)
            })
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    editProduct(productId) {
        const db = getDb();
        return db.collection(Product.COLLECTION_NAME)
            .upda
    }
}

module.exports = Product;
