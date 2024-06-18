const express=require("express");
const morgan =require("morgan");
const dotenv=require('dotenv');
const mySqlPool=require("./config/db");
const bodyParser = require('body-parser');
const router = express.Router();
//const joi=require('joi');


dotenv.config();

const app =express();
app.use(express.json());//request default parser
router.use(bodyParser.json());

app.use(morgan("dev"));
app.use("/v1/formdata",require("./routes/mysqlrouts"));

router.get('/test',(req,res)=>{
    res.status(200).send("<h1>Nodejs Mysql App</h1>");
    
});
app.use(router);

const PORT=process.env.PORT||8000;

mySqlPool.query('SELECT 1').then(()=>{
    console.log("mysql db connected");
    app.listen(PORT,()=>{
        console.log("Server Running");
    });
})
.catch((error)=>{
    console.log(error);
});