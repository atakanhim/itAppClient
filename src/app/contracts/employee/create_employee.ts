export interface Create_Employe_Request {
    appUserId:string;
    departmentId:string;
    employeName: string;
    employeSurname: string;
    employeTelNO:string; 
  }
export interface Create_Employe_Response {
  succeeded:boolean;
  message:string
  }
