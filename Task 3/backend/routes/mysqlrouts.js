const express=require('express');
const { getdata ,getdataById,createdata,updatedata,deletedata,searchquery,sortdata,searchsortpage,} = require('../controllers/controller');

//const {validation}=require('../schema/joivalidation');
const router = express.Router();

//router.get('/getall',getdata);

router.get('get/:id',getdataById);

router.post('/create',/*validation,*/createdata);

router.put('/update/:id',updatedata);
router.post('/select',searchquery);
router.delete('/delete/:id',deletedata);
router.get('/sort',sortdata);
//router.get('/page',pageindex);
router.get('/searching',searchsortpage);
module.exports=router

