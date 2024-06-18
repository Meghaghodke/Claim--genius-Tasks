const db = require("../config/db");

const selectdata=async()=>{
    const [data]=await db.query('SELECT * FROM form');
    return data;
};

const insertdata=async(fname,lname,dob,pnumber,Adress)=>{
    const[data]=await db.query(`INSERT INTO form (fname,lname,dob,pnumber,Adress) VALUES(?,?,?,?,?)`,[fname,lname,dob,pnumber,Adress ]);
    return [data];
};

const putdata =async(fname,lname,dob,pnumber,Adress,dataId)=>{
    const[data]=await db.query(`UPDATE form SET fname=?,lname=?,dob=?,pnumber=?,Adress=? WHERE id=?`,[fname,lname,dob,pnumber,Adress, dataId]);
    return [data];
};
const deleteuser=async(dataId)=>{
    const[data]=await db.query(`DELETE FROM form WHERE id =?`,[dataId]);
    return [data];
};
const searchuser=async(datafetch,l,startindex)=>{
    
    const[data]=await db.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch}%' OR lname LIKE '%${datafetch}%' OR dob LIKE '%${datafetch}%' OR pnumber LIKE '%${datafetch}%' OR adress LIKE '%${datafetch}%'  LIMIT ${l} OFFSET ${startindex} `);
    return [data];
};
        
const orderdata = async (sortby, sortquery,l,startindex) => {
    const [data] = await db.query(`SELECT * FROM form ORDER BY ${sortquery} ${sortby} LIMIT ${l} OFFSET ${startindex} `);
    return [data];
  //  return [data];
}
/*const pagelimit=async(l,startindex)=>{
   
    const [data] = await db.query(`SELECT * FROM form LIMIT ? OFFSET ?`, [l, startindex]);
    return [data];
}*/
const sortsearchquery=async(datafetch,l,startindex,sortby, sortquery)=>{
  
    const[data]=await db.query(` SELECT * FROM form  WHERE  fname LIKE '%${datafetch ||""}%' OR lname LIKE '%${datafetch ||""}%' OR dob LIKE '%${datafetch ||""}%' OR pnumber LIKE '%${datafetch ||""}%' OR adress LIKE '%${datafetch ||""}%' ORDER BY ${sortquery} ${sortby}  LIMIT ${l||4} OFFSET ${startindex||1} `);
    return [data];

};
const totalcalc=async(datafetch)=>{
    const totalrecords=await db.query(` SELECT count (* ) as count FROM form  WHERE  fname LIKE '%${datafetch ||""}%' OR lname LIKE '%${datafetch ||""}}%' OR dob LIKE '%${datafetch ||""}%' OR pnumber LIKE '%${datafetch ||""}%' OR adress LIKE '%${datafetch ||""}%'   `);
    console.log(totalrecords)
    return totalrecords;

}

module.exports={selectdata,insertdata,putdata,deleteuser,searchuser,orderdata,sortsearchquery,totalcalc};