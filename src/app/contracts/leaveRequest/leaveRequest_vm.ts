import { LeaveType_VM } from "../leaveType/leaveType_vm";

export interface LeaveRequest_VM {
    id:string;
    startDate: Date;
    endDate: Date;
    reason: string;
    isApproved: boolean;
    leaveType: LeaveType_VM;
}