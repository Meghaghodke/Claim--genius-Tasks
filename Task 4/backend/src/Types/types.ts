

export interface FormData {
   id:number;
    fname: string;
    lname: string;
    dob: Date;
    pnumber: bigint;
    Adress: string;
    editing:boolean;
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