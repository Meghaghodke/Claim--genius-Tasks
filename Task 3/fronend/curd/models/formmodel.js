import db from "../config/database.js";

export const getform=(result)=>{
    db.query("SELECT *FROM form",(err,result)=>{

        if(err){

            console.log(err);
            result(err,null);
        }else{
            result(null,result);
        }
    });
};


export const getformById=(id,result)=>{
    db.query("SELECT *FROM form WHERE f_id=?",[id],(err,result)=>{
        if(err){

            console.log(err);
            result(err,null);
        }else{
            result(null,result);
        }
    });
};
export const insertformById=(data,result)=>{
    db.query("INSERT INTO form SET?",[data],(err,result)=>{
        
        if(err){

            console.log(err);
            result(err,null);
        }else{
            result(null,result);
        }
    });
};


export const updateformById=(data,id,result)=>{
    db.query("UPDATE form SET  fName=?,lName=?,DOB=? WHERE f_id=?",[data.fName,data.lName,data.DOB,id],(err,result)=>{
        
        if(err){

            console.log(err);
            result(err,null);
        }else{
            result(null,result);
        }
    });
};

export const deleteformById=(id,result)=>{
    db.query("DELETE FROM form Where f_id=?",[id],(err,result)=>{
        
        if(err){

            console.log(err);
            result(err,null);
        }else{
            result(null,result);
        }
    });
};