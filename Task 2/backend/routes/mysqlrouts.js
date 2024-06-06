const express=require('express');
const { getdata ,getdataById,createdata,updatedata,deletedata} = require('../controllers/controller');


const router = express.Router();

router.get("/getall",getdata);

router.get('get/:id',getdataById);

router.post('/create',createdata);

router.put('/update/:id',updatedata);

router.delete('/delete/:id',deletedata);
module.exports=router