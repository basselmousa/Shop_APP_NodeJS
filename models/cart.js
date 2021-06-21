const fs = require('fs')
const path = require('path')
const pathHelper = require('../util/path')
const myPath = path.join(pathHelper, 'data', 'cart.json')
module.exports = class Cart {
    static addProduct(id, price) {
        // Fetch the previous cart
        fs.readFile(myPath, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;

            // Add new product / Increase the quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else {
                updatedProduct = {id: id, qty: 1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = (Number.parseFloat(cart.totalPrice) + Number.parseFloat(price)).toString()
            fs.writeFile(myPath, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, price) {
        fs.readFile(myPath, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart}
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (price * productQty)
            fs.writeFile(myPath, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
        fs.readFile(myPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                callback(null)
            } else {
                callback(cart)

            }
        })
    }
};
