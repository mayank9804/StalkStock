// 'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')
const models = require("./src/models/stalkstock")
require('dotenv').config()
const csv = require("fast-csv")

// mongoose.Promise = Promise
let app = express()
app.use(cors())
app.use(bodyParser.json())

// middleware
app.use((req,res,next)=>{
    console.log(req.headers);
    next();
});

let stockRouter = require("./src/routes/stockrouter")
app.get('/',(req,res)=>{
    res.send("PLEASE VISIT https://mayank9804.github.io/stalkstockangular/  to check the UI")
})
app.use('/api/stock/',stockRouter)

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is listening on Port ${process.env.PORT||3001}`);
});

mongoose.connect('mongodb://mayank:mayankisbest12@ds227481.mlab.com:27481/stalkstock',{useNewUrlParser: true},(err)=>{
    if(!err)
        console.log("Mongo Connection successful!");
});
