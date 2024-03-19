import { CheckMarkVM } from "../checkmark/checkmark_vm";
import { Department_VM } from "../department/department_vm";
import { LeaveRequest_VM } from "../leaveRequest/leaveRequest_vm";

export interface EmployeVM {
    id:string;
    appUserId:string;
    employeName: string;
    employeSurname: string;
    employeTelNo:string;
    usedLeaveDays:number;
    checkMarks:CheckMarkVM[];
    leaveRequests:LeaveRequest_VM[];
    department:Department_VM
  }
