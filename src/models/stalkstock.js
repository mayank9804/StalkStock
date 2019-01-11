// Modular Pattern
// Require this file for making instances of the model
// In controller i will write script to register all stock details
// ../controller/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StockSchema = new Schema({
    symbol : {type:String,required:true}
})
const StockDetailSchema = new Schema({
    open: {type:Number,required:true},
    high: {type:Number,required:true},
    low: {type:Number,required:true},
    close: {type:Number,required:true},
    volume: {type:Number,required:true},
    stock: {type:Schema.Types.ObjectId,required:true,ref:'Stock'},
    day : {type:Number,required:true},
    month: {type:Number,required:true},
    year : {type:Number,required:true},
    date : {type:Date,required:true}  
})

let Stock = mongoose.model('Stock',StockSchema)
let StockDetail = mongoose.model('StockDetail',StockDetailSchema)


module.exports = {
    Stock:Stock,
    StockDetail:StockDetail 
}