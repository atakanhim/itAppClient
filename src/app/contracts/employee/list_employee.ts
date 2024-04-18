import { EmployeWithAllIncludesVM, EmployeeWithCheckMarkVM, EmployeeWithLeaveRequestVM } from "./employe_vm";

export interface Single_EmployeWithAllIncludes {
  employee: EmployeWithAllIncludesVM
}
export interface Single_EmployeWithCheckMarks {
  employee: EmployeeWithCheckMarkVM
}
export interface Single_EmployeWithLeaveRequests {
  employee: EmployeeWithLeaveRequestVM
}
export interface List_EmployeWithAllIncludes {
  employees: EmployeWithAllIncludesVM[]
}
export interface List__EmployeWithLeaveRequests {
  employees: EmployeeWithLeaveRequestVM[]
}
export interface List_EmployeWithCheckMarks {
  employees: EmployeeWithCheckMarkVM[]
}
