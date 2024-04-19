import {  EmployeWithDepartmanVM } from "../employee/employe_vm";

export interface Default_CheckMark_VM {
  id:string;
  employeeId:string;
  date:Date;
  workingHours:number;
  overtimeHours: number;
  isPresent: boolean;  
}
export interface CheckMarkVM extends  Default_CheckMark_VM{

}
export interface CheckMarkWithEmployeeVM extends Default_CheckMark_VM {
  employee:EmployeWithDepartmanVM;
}
