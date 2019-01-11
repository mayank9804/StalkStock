const express = require('express')
let stockdetailsRouter = express.Router()
let sdc = require('../controllers/stockcontroller')

function route(){
    // Will hit just this single route and fetch data accordingly
    stockdetailsRouter.route('/stockdetails').post(sdc.stockDetails)
    
    stockdetailsRouter.route('/list').get(sdc.stockList)
    
    return stockdetailsRouter   
}

module.exports = route()