const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  id: Number,
    X0: String,
    Function: String
  
})

const ProductModel = mongoose.model('newtonn', productSchema)

module.exports = ProductModel