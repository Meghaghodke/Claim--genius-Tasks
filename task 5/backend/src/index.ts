import dotenv from 'dotenv';
dotenv.config(); 


import bodyParser from 'body-parser';
import express from 'express';
import mySqlPool from './config/db';
import router from './routes/myrouts';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

console.log('JWT_SECRET:', process.env.JWT_SECRET);
app.use('/uplods',express.static(path.join(__dirname,'../src/','uplods')))
app.use("/v1/formdata", router);
router.get('/test', (req, res) => {
    res.status(200).send("<h1>Nodejs Mysql App</h1>");
});

mySqlPool.query('SELECT 1').then(() => {
    console.log("mysql db connected");
    app.listen(PORT, () => {
        console.log("Server is running on port", PORT);
        console.log(path.join(__dirname,'../src/','uplods'));
    });
}).catch((error) => {
    console.log(error);
});
