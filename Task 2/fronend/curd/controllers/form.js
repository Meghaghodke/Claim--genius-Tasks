import{
    getform,
    getformById,
    insertformById,
    updateformById,
    deleteformById,
}from "../models/formmodel.js";

export const showForm=(req,res)=>{
    getform((err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};

export const  showformById=(req,res)=>{
    getformById(req.params.id,(err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};

export const createform=(req,res)=>{
    const data=req.body;
    insertformById(data,(err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};

export const updateform=(req,res)=>{
    const data=req.body;
    const id=req.params.id;
    updateformById(data,(err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};
export const deleteform=(req,res)=>{
   
    const id = req.params.id;
    deleteformById(data,(err,results)=>{
        if(err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
};