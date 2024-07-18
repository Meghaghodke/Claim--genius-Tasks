export interface Student{
    id:Number;
    fname:string;
    lname:string;
    dob:string;
    pnumber:string;
    Adress:string;
    images?: File | null;
    editing?:boolean;
  }
  export interface Record {
    id:Number;
    fname: string;
    lname: string;
    dob: string;
    pnumber: string;
    Adress: string;
    images?: File | null;
    editing?: boolean;
  }