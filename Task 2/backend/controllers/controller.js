const db = require("../config/db");


const getdata = async(req,res)=>{
    try{
        const data=await db.query('SELECT * FROM form');
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No records found'
            });
        }
        res.status(200).send({
            success:true,
            message:'All student records',
            data:data[0],
        });
    }
        catch (error){
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error in get all',
                error
            })
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
       const data=await db.query(`INSERT INTO form (fname,lname,dob,pnumber,Adress) VALUES(?,?,?,?,?)`,[fname,lname,dob,pnumber,Adress ]);
       if(!data){
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
          const data=await db.query(`UPDATE form SET fname=?,lname=?,dob=?,pnumber=?,Adress=? WHERE id=?`,[fname,lname,dob,pnumber,Adress, dataId]);
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
        await db.query(`DELETE FROM form WHERE id =?`,[dataId]);
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


module.exports={getdata,getdataById,createdata,updatedata,deletedata};