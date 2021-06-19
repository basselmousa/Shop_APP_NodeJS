const fs = require('fs')
const path = require('path')
const pathHelper = require('../util/path')
const myPath = path.join(pathHelper, 'data', 'products.json')
const getProductsFromFile = (callback) => {

    fs.readFile(myPath, (err, fileContent) => {
        if (err) {
            return  callback([])
        }
        callback(JSON.parse(fileContent))
    })
}
// https://www.publicdomainpictures.net/pictures/20000/t2/baby-lamb.jpg
module.exports = class Product {

    constructor(title, imageURL, description, price) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageURL = imageURL;

    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products =>{
            products.push(this)
            fs.writeFile(myPath, JSON.stringify(products), (err) => {
                console.log(err)
            })
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback)
    }

    static fetchById(id, callback){
        getProductsFromFile(products =>{
            const product = products.find(prod => prod.id === id);
            callback(product);

        })
    }

}
