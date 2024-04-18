export interface Default_CheckMark_Request {
      startDate:any; 
      endDate?: any | null ;
      employeeId:string;
    appUserId:string;
    departmentId:string;
    employeName: string;
    employeSurname: string;
    employeTelNo:string; 
}
export interface Create_CheckMark_Request extends Default_CheckMark_Request {
    
  } 
export interface Update_CheckMark_Request extends Default_CheckMark_Request {
    id:string;
  }
