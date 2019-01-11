// Code to register stock symbol
// Code to add stock details of everyday

// Modular pattern

const models = require('../models/stalkstock.js')

module.exports = {
    registerStockSymbol : (req,res)=>{
        let newEntry = new models.Stock({
            symbol: req.body.symbol
        })

        newEntry.save((err,newStock)=>{
            if(err)
                res.status(503).send({message:"ERROR in saving stock!"})
            else
                re.status(200).send({message:"Success",id:newStock._id})
        })
    },
    registerStockDetail : (req,res)=>{
        let newEntry = new models.StockDetail({
            open: req.body.open,
            high: re.body.high,
            low: req.body.low,
            close: req.body.close,
            volume: req.body.volume,
            stock: req.body.stockid,
            day : req.body.date.day,
            month: req.body.date.month,
            year : req.body.date.year,
            date : req.body.date.date
        })

        newEntry.save((err,sd)=>{
            if(err)
                res.status(503).send({message:"Some Error occured while saving stock details"})
            else
                res.status(200).send({message:"Success",id:sd._id})
            
        })
    }
}