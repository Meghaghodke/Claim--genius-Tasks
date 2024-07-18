import { promises } from "fs";
import db from "../config/db";
import { FormData, images } from "../types/types";

// interface FormData {
   
//     fname: string;
//     lname: string;
//     dob: Date;
//     pnumber: bigint;
//     address: string;
// }

const selectdata=async()=>{
    const [data]=await db.query('SELECT * FROM form');
    return data;
};

const insertdata=async(fname:string,lname:string,dob:Date,pnumber:bigint,Adress:string,images:string)=>{
    const[data]=await db.query(`INSERT INTO form (fname,lname,dob,pnumber,Adress,images) VALUES(?,?,?,?,?,?)`,[fname,lname,dob,pnumber,Adress ,images]);
    return [data];
};

const putdata =async(fname:string,lname:string,dob:Date,pnumber:bigint,Adress:string,images:string|undefined,dataId:number):Promise<void>=>{
    await db.query(`UPDATE form SET fname=?,lname=?,dob=?,pnumber=?,Adress=?,images=? WHERE id=?`,[fname,lname,dob,pnumber,Adress, images,dataId]);
    //return [data];
};
const deleteuser=async(dataId:number):Promise<void>=>{
    const[data]=await db.query(`DELETE FROM form WHERE id =?`,[dataId]);
    //return data;
};
const searchuser=async(datafetch:string,l:number,startindex:number)=>{
    
    const[data]=await db.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch}%' OR lname LIKE '%${datafetch}%' OR dob LIKE '%${datafetch}%' OR pnumber LIKE '%${datafetch}%' OR adress LIKE '%${datafetch}%'  LIMIT ${l} OFFSET ${startindex} `);
    return [data];
};
        
const orderdata = async (sortby:string, sortquery:string,l:number,startindex:number) => {
    const [data] = await db.query(`SELECT * FROM form ORDER BY ${sortquery} ${sortby} LIMIT ${l} OFFSET ${startindex} `);
    return [data];
  //  return [data];
}
/*const pagelimit=async(l,startindex)=>{
   
    const [data] = await db.query(`SELECT * FROM form LIMIT ? OFFSET ?`, [l, startindex]);
    return [data];
}*/
const sortsearchquery=async(datafetch:string,l:number,startindex:number,sortby:string, sortquery:string):Promise<FormData[]>=>{
  
    
    const[data]=await db.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch ||""}%' OR lname LIKE '%${datafetch ||""}%' OR dob LIKE '%${datafetch ||""}%' OR pnumber LIKE '%${datafetch ||""}%' OR adress LIKE '%${datafetch ||""}%' ORDER BY ${sortquery } ${sortby }  LIMIT ${l} OFFSET ${startindex} `);
    console.log(data);
    return data as FormData[];

};
const totalcalc=async(datafetch:string):Promise<number>=>{
    const [totalrecords]=await db.query(` SELECT count (* ) as count FROM form  WHERE  fname LIKE '%${datafetch ||""}%' OR lname LIKE '%${datafetch ||""}}%' OR dob LIKE '%${datafetch ||""}%' OR pnumber LIKE '%${datafetch ||""}%' OR adress LIKE '%${datafetch ||""}%' OR images LIKE '%${datafetch}'  `);
    const [{count}]=totalrecords as{count:number}[];
    console.log(totalrecords);
    return count;

}
const filesUploaded = async (filename: string, user_id: number) => {
    

    const [data] = await db.query('INSERT INTO files (Files, user_id) VALUES (?, ?)', [filename, user_id]);
    return [data];
    
  };
const getUser=async(user_id:number)=>{
    const [data]=await db.query(`SELECT * FROM files where user_id=?`,[user_id]);
    return data as images[];
}
const updateuser= async(filename: string, user_id: number)=>{
    const [data]=await db.query(`UPDATE files SET Files =? where user_id=?`,[filename,user_id]);
    return[data];
}
export default{selectdata,insertdata,putdata,deleteuser,searchuser,orderdata,sortsearchquery,totalcalc,filesUploaded,getUser,updateuser };