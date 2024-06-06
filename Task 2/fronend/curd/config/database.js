import mysql from "mysql2";

const db=mysql.createConnection({
    host:"localHost",
    user:"root",
    password:"",
    database:"f_db"
});
export default db;