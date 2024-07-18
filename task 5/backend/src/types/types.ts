export interface FormData {
    id:number;
     fname: string;
     lname: string;
     dob: Date;
     pnumber: bigint;
     Adress: string;
     editing:boolean;
     images:string;
     Files:File;
     user_id:number;
     existingUser:string;
 }
 
 export interface Responsedata{
     success:boolean
     message?: string;
     data?: FormData[];
     totalrecords?: number;
     error?:unknown;
     
 }
 export interface Querydata{
     datafetch:string;
     sortby?:string;
     sortquery?:string;
    
 
 }
 export interface dataids{
     id:string;
 }
 export interface User {
    id: number;
    username: string;
    password: string;
}
export interface images{
    Files:string;
    user_id:number;
    existingUser:string;
}