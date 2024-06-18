const mysql=require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const mySqlPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:"",
    database:'mysql_db',
    
});

module.exports=mySqlPool;