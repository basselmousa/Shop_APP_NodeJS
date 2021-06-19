const fs = require('fs')
const path = require('path')
const pathHelper = require('../util/path')
const myPath = path.join(pathHelper, 'data', 'cart.json')
module.exports = class Cart {
    static addProduct(id, price){
        // Fetch the previous cart
        fs.readFile(myPath, (err, fileContent)=>{
            let cart = {products: [], totalPrice :0}
            if (!err){
                cart = JSON.parse(fileContent)
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;

            // Add new product / Increase the quantity
            if (existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty +1;
                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            } else{
                updatedProduct = {id: id, qty:1}
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = (Number.parseFloat(cart.totalPrice) + Number.parseFloat(price)).toString()
            fs.writeFile(myPath, JSON.stringify(cart), (err) =>{
                console.log(err)
            })
        })


    }
}
