let csvstream = csv.fromPath("./src/script/prices.csv", {trim: true, ignoreEmpty:true, strictColumnHandling:false}).on("data",async(sheet)=>{
    if(sheet[0]!="date" && sheet){
    csvstream.pause()

    let stockid;
    
    let stocks = await models.Stock.find({symbol:sheet[1]})
    // if stock symbol exists it will fill stocks array
    if(stocks.length==0){
        let stockentry = new models.Stock({
        symbol:sheet[1]
    })
    let newStock = await stockentry.save()
    stockid = newStock._id
    }else{
        stockid = stocks[0]._id
    }

    let ddate = sheet[0]
    let p1 = ddate.split(" ")[0]

    let d = new models.StockDetail({
        open:sheet[2],
        high:sheet[5],
        low:sheet[4],
        close:sheet[3],
        volume:sheet[6],
        stock:stockid,
        day:p1.split("-")[2],
        month:p1.split("-")[1],
        year:p1.split("-")[0],
        date:p1
    })
    console.log(d);
    
    try{
        await d.save((err,dd)=>{
            if(err)
                throw err
        })
    }catch(err){
        console.log("ERROR")
    }

    csvstream.resume()
}
}).on("end",()=>{
    console.log("done"); 
}).on("error",(err)=>{
    console.log(err);
    
})
