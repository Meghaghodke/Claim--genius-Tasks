import  mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const mySqlPool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:"",
    database:'mysql_db',
    
});

export default mySqlPool;