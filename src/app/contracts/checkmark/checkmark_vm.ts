import { EmployeVM, EmployeVM_Epmty } from "../employee/employe_vm";

export interface CheckMarkVM {
    id:string;
    employeeId:string;
    date:Date;
    workingHours:number;
    overtimeHours: number;
    isPresent: boolean;  
  }
export interface CheckMarkVM_wEmployee{
    id:string;
    employeeId:string;
    date:Date;
    workingHours:number;
    overtimeHours: number;
    isPresent: boolean;  
    employee:EmployeVM_Epmty

  }
