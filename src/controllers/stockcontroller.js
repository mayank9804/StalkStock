const models = require('../models/stalkstock')
module.exports = {
    stockDetails : async (req,res)=>{
        try{
            console.log(req.body);
            
            if(req.body.day && req.body.day!='' && req.body.month && req.body.month!='' && req.body.year && req.body.year!=''){
                // Send just one particular entry
                let stock = await models.Stock.find({symbol:req.body.symbol})
                if(!stock)
                    res.status(400).send({message:"No such stock exists!"})
                
                console.log(stock);
                
                let details = await models.StockDetail.find({stock:stock[0]._id,year:req.body.year,month:req.body.month,day:req.body.day})
                
                if(!details)
                    res.status(400).send({message:"Cannot find details"})
                
                
                // NO need to omit any result mayBe...
                else{
                    res.status(200).send({message:"Success",data:details})
                }
                
            }else if(req.body.year && req.body.year!='' && !req.body.month){
                // Send all year report the stock
                
                let details = await models.StockDetail.find({stock:req.body.id,year:req.body.year})
                if(!details)
                    res.status(400).send({message:"Cannot find details"})
                
                // NO need to omit any result mayBe...
                
                res.status(200).send({message:"Success",data:details})
                
            }else if(req.body.year && req.body.year!='' && req.body.month && req.body.month!=''){
                // Send selected monthly report of the stock
                // Send all year report the stock

                let details = await models.StockDetail.find({stock:req.body.id,year:req.body.year,month:req.body.month})
                if(!details)
                    res.status(400).send({message:"Cannot find details"})
                
                // NO need to omit any result mayBe...
                else{
                    res.status(200).send({message:"Success",data:details})
                }
            }
        }catch(err){
            res.status(503).send({message:"ERROR"})
        }
    },

    stockList: async(req,res)=>{
        try{
            let list = await models.Stock.find({})
            if(list.length==0)
                res.status(400).send({message:"No list found"})
            else
                res.status(200).send({message:"Success",data:list})
        }catch(err){
            res.status(503).send({message:"ERROR"})
        }
    }
}