/**
 * These For Read and Write From File
 const fs = require('fs')
 const path = require('path')
 const pathHelper = require('../util/path')
 const myPath = path.join(pathHelper, 'data', 'products.json')
 */

// for connecting to database
const db = require('../util/database')
const Cart = require('./cart')

/**
 * these method for get from file
 const getProductsFromFile = (callback) => {

    fs.readFile(myPath, (err, fileContent) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(fileContent))
    })
}
 */
// https://www.publicdomainpictures.net/pictures/20000/t2/baby-lamb.jpg
module.exports = class Product {

    constructor(id, title, imageURL, description, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageURL = imageURL;

    }

    save() {
        /**
         * These for save to file and update existing one from file
         getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProduct = [...products]
                updatedProduct[existingProductIndex] = this
                fs.writeFile(myPath, JSON.stringify(updatedProduct), (err) => {
                    console.log(err)
                })
            } else {
                this.id = Math.random().toString();
                products.push(this)
                fs.writeFile(myPath, JSON.stringify(products), (err) => {
                    console.log(err)
                })
            }
        })
         */

        return db.execute("INSERT INTO products (title, price, description,imageUrl) VALUES (?,?,?,?)", [
            this.title,
            this.price,
            this.description,
            this.imageURL
        ]);
    }

    static fetchAll() {
        /**
         * these for get all from products file
         getProductsFromFile(callback)
         */

        // these for fetch from database
        return db.execute('SELECT * FROM products');

    }

    static fetchById(id) {
        /**
         * these for get by id from products file
         getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);

        })
         */
        return db.execute('SELECT * FROM products WHERE products.id = ?',[
            id
        ]);
    }

    static deleteProduct(id) {
        /**
         * these for delete product from file
         getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);

            fs.writeFile(myPath, JSON.stringify(updatedProducts), (err) => {
                if (!err){
                    Cart.deleteProduct(id, product.price);
                }

                console.log(err)
            })

        })
         */
    }

}
