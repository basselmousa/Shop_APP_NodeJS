const fs = require('fs')
const path = require('path')
const pathHelper = require('../util/path')
const myPath = path.join(pathHelper, 'data', 'products.json')
const Cart = require('./cart')
const getProductsFromFile = (callback) => {

    fs.readFile(myPath, (err, fileContent) => {
        if (err) {
            return callback([])
        }
        callback(JSON.parse(fileContent))
    })
}
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
    }

    static fetchAll(callback) {
        getProductsFromFile(callback)
    }

    static fetchById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);

        })
    }
    static deleteProduct(id){
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
    }

}
