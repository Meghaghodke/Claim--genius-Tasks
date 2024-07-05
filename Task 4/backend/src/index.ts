import express from "express";
//const morgan =require("morgan");
import dotenv from 'dotenv';
import mySqlPool from "./config/db";
//const bodyParser = require('body-parser');
//const router =express.Router();
//const joi=require('joi');
import router from './routes/myrouts'

dotenv.config();

const app =express();
const PORT = 3000;
app.use(express.json());//request default parser
//router.use(bodyParser.json());

//app.use(morgan("dev"));
app.use("/v1/formdata",router);
router.get('/test',(req,res)=>{
    res.status(200).send("<h1>Nodejs Mysql App</h1>");
    
});
app.use(router);

//const PORT=process.env.PORT||8000;

mySqlPool.query('SELECT 1').then(()=>{
    console.log("mysql db connected");
    app.listen(PORT,()=>{
        console.log("Server Running");
    });
})
.catch((error)=>{
    console.log(error);
});
