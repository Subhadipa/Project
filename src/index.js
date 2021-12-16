const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const rateLimit = require('express-rate-limit')
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/SubhadipaBanerjee_db?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb running on 3000'))
    .catch(err => console.log(err))
   
const apiRequestLimiter = rateLimit
(
    {
       
        max: 5 ,
        message:{ status: true, msg: "Limit exceeded"}
    }
)
    
    // Use the limit rule as an application middleware
    app.use(apiRequestLimiter)
app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});