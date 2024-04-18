import { CheckMarkVM } from "../checkmark/checkmark_vm";
import { Department_VM } from "../department/department_vm";
import { LeaveRequest_VM } from "../leaveRequest/leaveRequest_vm";
export interface Base_EmployeVM {
  id: string;
  appUserId: string;
  employeName: string;
  employeSurname: string;
  employeTelNo: string;
  usedLeaveDays: number;
}
export interface EmployeWithNothingVM extends Base_EmployeVM {
}
export interface EmployeeWithCheckMarkVM extends Base_EmployeVM {
  checkMarks: CheckMarkVM[];
  department: Department_VM
}
export interface EmployeeWithLeaveRequestVM extends Base_EmployeVM {
  leaveRequests: LeaveRequest_VM[];
  department: Department_VM
}
export interface EmployeWithAllIncludesVM extends Base_EmployeVM {
  department: Department_VM
  checkMarks: CheckMarkVM[];
  leaveRequests: LeaveRequest_VM[];
}
