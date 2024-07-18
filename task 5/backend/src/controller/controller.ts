//import db from"../config/db" ;
import q from "../queries/queries";
import{Request,Response}from 'express';
import { FormData,Responsedata,Querydata, dataids,images } from "../types/types";
import { promises } from "dns";
import { toFormData } from "axios";

// controllers/dataController.js
//const q = require("../services/queries");
// interface Form {
//     fname: string;
//     lname: string;
//     dob: Date;
//     pnumber: bigint;
//     Adress: string;

//   }

// import path from 'path';

// const multer = require('multer');

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req: any, file: any, cb: any) {
//     cb(null, 'uploads/'); 
//   },
//   filename: function (req: any, file: any, cb: any) {
//     cb(null, Date.now() + path.extname(file.originalname)); 
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware to handle file upload
// const uploadFile = upload.single('images');

export const getdata = async (req:Request ,res:Response)  => {
    try {
        const selecte = await q.selectdata(); 
        if (!selecte) {
            return res.status(404).send({
                success: false,
                message: 'No records found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'All student records',
            data: selecte
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all',
            error
        });
    }
};




/*export const getdataById = async(req:Request ,res:Response)=>{
    try{
        const dataId=req.params.id
        if(!dataId){
            return res.status(404).send({
                succes:false,
                message:'Invalid or provide student id'
            })
        }
        const data=await db.query(`SELECT * FROM mysql_db WHERE id=?`,[dataId]);
        if(data){
            return res.status(404).send({
                success:false,
                message:'no records found'
            })
        }
        res.status(200).send({
            success:true,
            data:data[0],
        })
    }catch(error){
        console.log(error)
        res.status(500).send({

            succes:false,
            message:'Error in get record',
        })
    }
};*/

export const createdata = async (req: Request, res: Response<Responsedata>) => {
    // try {
    //   // Upload file first
    //   uploadFile(req, res, async function (err: any) {
    //     if (err instanceof multer.MulterError) {
    //       // A Multer error occurred when uploading
    //       console.error(err);
    //       return res.status(500).send({
    //         success: false,
    //         message: 'Error uploading file',
    //         error: err,
    //       });
    //     } else if (err) {
    //       // An unknown error occurred when uploading
    //       console.error(err);
    //       return res.status(500).send({
    //         success: false,
    //         message: 'Unknown error uploading file',
    //         error: err,
    //       });
    //     }
  
        // File uploaded successfully, now handle form data
        try {
          const { fname, lname, dob, pnumber, Adress } = req.body as FormData;
          const images = req.file?.filename; 
  
          
          if (!fname || !lname || !dob || !pnumber || !Adress || !images) {
            return res.status(400).send({
              success: false,
              message: 'Please provide all fields including the image',
            });
          }
          
          // Insert data into database
          const inserted = await q.insertdata(fname, lname, dob, pnumber, Adress, images);
  
          if (!inserted) {
            return res.status(500).send({
              success: false,
              message: 'Error in insert query',
            });
          }
  
          res.status(201).send({
            success: true,
            message: 'New student record created',
          });
        } catch (error) {
          console.error('Error in data handling:', error);
          res.status(500).send({
            success: false,
            message: 'Error in handling data',
            error: error,
          });
        }
      };
    
    
  export const updatedata = async (req: Request, res: Response<Responsedata>) => {
    
        try {
          const Iddata = req.params.id;
          const dataId = parseInt(Iddata, 10);
  
          if (!dataId) {
            return res.status(404).send({
              success: false,
              message: 'Invalid id provided',
            });
          }
  
          const { fname, lname, dob, pnumber, Adress } = req.body as FormData;
  
      const images=req.file?.filename;
  
          // Check if req.file exists before accessing its properties
        
  
          const data = await q.putdata(fname, lname, dob, pnumber, Adress, images, dataId);
  
        //   if (!data) {
        //     return res.status(500).send({
        //       success: false,
        //       message: 'Error updating data',
        //     });
        //   }
  
          res.status(200).send({
            success: true,
            message: 'Form details updated successfully',
          });
  
        } catch (error) {
          console.error('Error in updating data:', error);
          res.status(500).send({
            success: false,
            message: 'Error in update student API',
            error,
          });
        }
      };
export const deletedata= async(req:Request,res:Response<Responsedata>):Promise<void>=>{
    try{
        const Iddata=req.params.id
        const dataId=parseInt(Iddata)
        if(!dataId){
             res.status(404).send({
                success:false,
                message:'Please provude id',
            });
        }
        //await db.query(`DELETE FROM form WHERE id =?`,[dataId]);
        const data =await q.deleteuser(dataId );
        res.status(200).send({
            success:true,
            message:'data deleated',
          });
        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete data',
            error,

        });
    }
};
export const searchquery = async (req:Request<Querydata>,res:Response) => {
    try {
        const  datafetch = req.body.datafetch as string;
        const {limit}=req.query ;
        const{offset}=req.query;
        if (!datafetch&& !limit &&!offset) {
            return res.status(404).send({
                success: false,
                message: 'NOT found',
            });
        }
       // const query = ` SELECT * FROM form  WHERE  fname LIKE '%${datafetch}%' OR lname LIKE '%${datafetch}%' OR dob LIKE '%${datafetch}%' OR pnumber LIKE '%${datafetch}%' OR adress LIKE '%${datafetch}%'  `;
        //const data = await db.query(query);
       const l=parseInt(limit as string );
        const o=parseInt(offset as string);
        const startindex=(o-1)*l;
        
        const data=await q.searchuser(datafetch,l,startindex);
        
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data:data[0]
        });
    } catch (error ) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
};
export const sortdata =async (req:Request ,res:Response)=>{
    try{
        const {sortby}=req.query;
        const {sortquery}=req.query;
        const {limit}=req.query;
        const{offset}=req.query;
        if (!(sortby&&sortquery)) {
            return res.status(404).send({
                success: false,
                message: 'Please provide at least one search parameter',
            });
        }
        const l=parseInt(limit as string);
        const o=parseInt(offset as string);
        const startindex=(o-1)*l;
        const data=await q.orderdata(sortby as string,sortquery as string,l,startindex);
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data:data[0]
        
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
};

/*const pageindex=async(req,res)=>{
    try{
        const {limit}=req.query;
        const {offset}=req.query;
        //const startindex=(limit-1)*offset;
        if (!limit && !offset) {
            return res.status(404).send({
                success: false,
                message: 'No records found'
            });
        }
        const l=parseInt(limit);
        const o=parseInt(offset);
        const startindex=(o-1)*l;
        const value = await q.pagelimit(l,startindex); 
        res.status(200).send({
            success: true,
            message: 'limited records',
            data: value[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all',
            error
        });
    }
};*/
export const searchsortpage = async (req:Request ,res:Response<Responsedata>) => {
    try {
        const { datafetch } = req.query||" ";
        const { limit}= req.query;
       const {offset}= req.query;
        const{ sortby}= req.query;
       const { sortquery } = req.query;

        const l =  parseInt(limit as string) ; 
        const o =  parseInt(offset as string); 
        const startindex = (o - 1) * l;

       /* if ( !limit && !offset ) {
            return res.status(404).send({
                success: false,
                message: 'No parameters provided for query',
           });
       }*/


       
        const data = await q.sortsearchquery(datafetch as string||"",l || 5,startindex || 0 ,sortby as string|| 'desc',sortquery as string|| 'id');
        const data2=await q.totalcalc(datafetch as string||"");
       
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data: data,
            totalrecords: data2
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
        });
    }
};


export const UploadFiles = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields including the image',
      });
    }

    let filesString = '';
    for (const file of files) {
      filesString +=file.filename + ',';
    }
   

    const existingUser = await q.getUser(user_id);
   console.log(existingUser);
   console.log(filesString);
   
    if( existingUser.length ){
      filesString += existingUser[0].Files+',';
    }
    console.log(filesString);
    
    if (existingUser.length) {
      
      const updated = await q.updateuser(filesString, user_id);

      if (!updated) {
        return res.status(500).send({
          success: false,
          message: 'Error in update query',
        });
      }
    } else {
    
      const inserted = await q.filesUploaded(filesString, user_id);

      if (!inserted) {

        return res.status(500).send({
          success: false,
          message: 'Error in insert query',
        });
      }
    }

    res.status(201).send({
      success: true,
      message: 'Files uploaded and records created or updated successfully',
    });
  } catch (error) {
    console.error('Error in data handling:', error);
    res.status(500).send({
      success: false,
      message: 'Error in handling data',
      error: error,
    });
  }
};


export const fetchData = async (req: Request, res: Response) => {
  try {
    const { user_id } =   req.body; 
    console.log(user_id);

    if (!user_id) {
      return res.status(400).send({
        success: false,
        message: 'User ID is required',
      });
    }
    //import cfdcfc from ".././uplods"

    const selecte = await q.getUser(user_id);
    console.log(selecte);
   
    if (!selecte ) {
      return res.status(404).send({
        success: false,
        message: 'No records found',
      });
    }
    
      
     
      
    const split_img=selecte[0].Files.split(',').slice(0,-1);

    
    const fileUrls: string[] = [];

    for (const file of split_img) {
      fileUrls.push(`http://localhost:3000/uploads/${file}`);
    }
    res.status(200).send({
      success: true,
      message: 'All user records',
      data: split_img,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send({
      success: false,
      message: 'Error fetching data',
      error,
    });
  }
};
