import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { List_Department } from 'src/app/contracts/department/list_department';
import { CustomToastrService } from 'src/app/services/admin/custom-toastr.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { BaseDialog } from '../base/base-dialog';
import { Department_VM } from 'src/app/contracts/department/department_vm';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmployeVM } from 'src/app/contracts/employee/employe_vm';
import { Update_Employe_Response } from 'src/app/contracts/employee/responses';
import { Update_Employe_Request } from 'src/app/contracts/employee/requests';

declare  let $: any;
@Component({
  selector: 'app-update-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './update-employee-dialog.component.html',
  styleUrl: './update-employee-dialog.component.scss'
})
export class UpdateEmployeeDialogComponent extends BaseDialog<UpdateEmployeeDialogComponent> {
  updateEmployeeForm: FormGroup;
  departments: Department_VM[] = [];
  constructor(
    private departmentService: DepartmentService,
    private toastrService: CustomToastrService,
    dialogRef: MatDialogRef<UpdateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeVM,
    private fb: FormBuilder,
  ) {
    super(dialogRef);
  }
  
  ngOnInit() {
    this.getDepartments();

    this.updateEmployeeForm = this.fb.group({
      departmentId: [this.data.department.id, Validators.required],
      employeName: [this.data.employeName, Validators.required],
      employeSurname: [this.data.employeSurname, Validators.required],
      employeTelNO: [this.data.employeTelNo, [Validators.required, Validators.pattern(/^\d+$/)]], // Phone number validation
    });
  
  }

  async getDepartments() {
    try {
      var data: List_Department =
        await this.departmentService.getAllDepartments();
      this.departments = data.departments;
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }


  updateEmployee() {
    if (this.updateEmployeeForm.valid) {
      const employeeData:Update_Employe_Request = this.updateEmployeeForm.value;
      // You can modify employeeData before sending
      employeeData.id=this.data.id;     
      this.dialogRef.close(employeeData);
    } else {
      console.warn('Form is invalid');
    }
  }
}
