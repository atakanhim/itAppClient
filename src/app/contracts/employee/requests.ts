export interface Default_Employe_Request {
    appUserId:string;
    departmentId:string;
    employeName: string;
    employeSurname: string;
    employeTelNo:string; 
}
export interface Create_Employe_Request extends Default_Employe_Request {
    
  } 
export interface Update_Employe_Request extends Default_Employe_Request {
    id:string;
  }
