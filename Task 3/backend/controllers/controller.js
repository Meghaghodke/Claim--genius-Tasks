const db = require("../config/db");
const q=require("../services/queries");

// controllers/dataController.js
//const q = require("../services/queries");

const getdata = async (req, res) => {
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




const getdataById = async(req,res)=>{
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
};

const createdata= async (req,res)=>{
try{
       const {fname,lname,dob,pnumber,Adress }=req.body;
       if(!fname ||!lname||!dob||!pnumber ||!Adress){
        return res.status(500).send({
            success:false,
            message:'please provide all filds'
        });
       }
       //const data=await db.query(`INSERT INTO form (fname,lname,dob,pnumber,Adress) VALUES(?,?,?,?,?)`,[fname,lname,dob,pnumber,Adress ]);
       const inserted=await q.insertdata(fname,lname,dob,pnumber,Adress);
       if(!inserted){
        return res.status(404).send({
            success:false,
            message:'error in insert query',
        });
       }
       res.status(201).send({
        success:true,
        message:'New Student record Ceated',
       })

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in  data',
        error
    })
}
};
    
const updatedata=async(req,res)=>{
    try{
          const dataId=req.params.id
          if(!dataId){
            return res.status(404).send({
                success:false,
                message:'invalid id or provide id'
            })
          }
          const  {fname,lname,dob,pnumber,Adress }=req.body
          //const data=await db.query(`UPDATE form SET fname=?,lname=?,dob=?,pnumber=?,Adress=? WHERE id=?`,[fname,lname,dob,pnumber,Adress, dataId]);
          const data=await q.putdata(fname,lname,dob,pnumber,Adress,dataId);
          if(!data){
            return res.status(500).send({
                success:false,
                message:'error in update data',
            });
          }
          res.status(200).send({
            success:true,
            message:'form details',
          });
          
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update student api',
            error,
        })
    }


};

const deletedata= async(req,res)=>{
    try{
        const dataId=req.params.id
        if(!dataId){
            return res.status(404).send({
                success:false,
                message:'Please provude id',
            });
        }
        //await db.query(`DELETE FROM form WHERE id =?`,[dataId]);
        const data =await q.deleteuser(dataId);
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
const searchquery = async (req, res) => {
    try {
        const  {datafetch} = req.body;
        const {limit}=req.query;
        const{offset}=req.query;
        if (!datafetch&& !limit &&!offset) {
            return res.status(404).send({
                success: false,
                message: 'NOT found',
            });
        }
       // const query = ` SELECT * FROM form  WHERE  fname LIKE '%${datafetch}%' OR lname LIKE '%${datafetch}%' OR dob LIKE '%${datafetch}%' OR pnumber LIKE '%${datafetch}%' OR adress LIKE '%${datafetch}%'  `;
        //const data = await db.query(query);
       const l=parseInt(limit);
        const o=parseInt(offset);
        const startindex=(o-1)*l;
        const data=await q.searchuser(datafetch,l,startindex);
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
            error: error.message,
        });
    }
};
const sortdata =async (req,res)=>{
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
        const l=parseInt(limit);
        const o=parseInt(offset);
        const startindex=(o-1)*l;
        const data=await q.orderdata(sortby,sortquery,l,startindex);
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
            error: error.message,
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
const searchsortpage = async (req, res) => {
    try {
        const { datafetch } = req.query||" ";
        const { limit}= req.query;
       const {offset}= req.query;
        const{ sortby}= req.query;
       const { sortquery } = req.query;

        const l =  parseInt(limit) ; 
        const o =  parseInt(offset); 
        const startindex = (o - 1) * l;

       /* if ( !limit && !offset ) {
            return res.status(404).send({
                success: false,
                message: 'No parameters provided for query',
           });
       }*/


       
        const data = await q.sortsearchquery(datafetch||"",l || 5,startindex || 1 ,sortby || 'desc',sortquery || 'id');
        const data2=await q.totalcalc(datafetch||"");
        res.status(200).send({
            success: true,
            message: 'Data fetched successfully',
            data: data[0],
            totalrecords: data2[0][0].count
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

module.exports={getdata,getdataById,createdata,updatedata,deletedata,searchquery,sortdata,searchsortpage};