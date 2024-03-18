import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Create_Employe_Request } from 'src/app/contracts/employee/create_employee';
import { Department_VM } from 'src/app/contracts/department/department_vm';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { List_Department } from 'src/app/contracts/department/list_department';

@Component({
  selector: 'app-create-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule ],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss'
})
export class CreateEmployeeDialogComponent extends BaseDialog<CreateEmployeeDialogComponent> {
  createEmployeeForm: FormGroup;
  departments:Department_VM[] = [];
  constructor(
    private departmentService: DepartmentService,
    dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Create_Employe_Request,
    private fb: FormBuilder
  ) {
    super(dialogRef)
  }
   ngOnInit() {
    this.getDepartments();
    this.createEmployeeForm = this.fb.group({
      departmentId: ['', Validators.required],
      employeName: ['', Validators.required],
      employeSurname: ['', Validators.required],
      employeTelNO: ['', [Validators.required, Validators.pattern(/^\d+$/)]] // Phone number validation
    });
  }
  async getDepartments(){
    try {
      var data:List_Department = await this.departmentService.getAllDepartments();    
      this.departments = data.departments ;
    } catch (error) {
      console.error('Error loading employees:', error);
    }   
  }
  
  createEmployee() {
    // Form validation check
    if (this.createEmployeeForm.valid) {
      const employeeData = this.createEmployeeForm.value;
      // You can modify employeeData before sending
      this.dialogRef.close(employeeData);
    } else {
      console.warn('Form is invalid');
    }
  }

}
