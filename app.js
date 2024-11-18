//Basic

const express = require('express')
const router = require("./routes/api.js");
const app = express();
const bodyParser = require('body-parser');

//security Middleware Lib Import

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp =require('hpp');
const cors = require('cors');

//Database Lib Import

const mongoose = require('mongoose');


//Security Middleware Implement 

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//Body Parser Implement

app.use(bodyParser.json());

//Request rate limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//MongoDB Database Connection 
const MONGODB_CONNECTION="mongodb+srv://mdfawjulazim:mdfawjulazim123@cluster.szrub.mongodb.net/Todo";

mongoose.connect(MONGODB_CONNECTION,{autoIndex:true}).then(()=>{
  console.log("Connected to MongoDB");
}).catch(err=>{
  console.log("Error connecting to MongoDB");
})

app.use("/api/v1",router);

//Undefined Routing Implement

app.use("*",(req,res)=>{
    res.status(404).json({message: "Page Not Found"});
})

 
module.exports = app;