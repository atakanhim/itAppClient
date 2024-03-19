import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Create_Employe_Request } from 'src/app/contracts/employee/create_employee';
import { Department_VM } from 'src/app/contracts/department/department_vm';
import { DepartmentService } from 'src/app/services/common/models/department.service';
import { List_Department } from 'src/app/contracts/department/list_department';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/admin/custom-toastr.service';
import { slideInOutAnimation } from 'src/app/animations/slideInOut-animation';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {
  Create_Department_Request,
  Create_Department_Response,
} from 'src/app/contracts/department/department_request';

@Component({
  selector: 'app-create-employee-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatIconModule],
  templateUrl: './create-employee-dialog.component.html',
  styleUrl: './create-employee-dialog.component.scss',
  animations: [slideInOutAnimation],
})
export class CreateEmployeeDialogComponent extends BaseDialog<CreateEmployeeDialogComponent> {
  createEmployeeForm: FormGroup;
  departmentForm: FormGroup;
  showList = false;

  departments: Department_VM[] = [];
  showAddDepartmentForm: boolean = false; // Yeni departman ekleme formunu göstermek için kullanılacak değişken
  constructor(
    private departmentService: DepartmentService,
    private toastrService: CustomToastrService,
    private changeDetector: ChangeDetectorRef,

    dialogRef: MatDialogRef<CreateEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Create_Employe_Request,
    private fb: FormBuilder,
    private fb2: FormBuilder
  ) {
    super(dialogRef);
  }
  toggleList() {
    console.log(this.showList)
    this.showList = !this.showList;
  }
  ngOnInit() {
    this.getDepartments();
    this.departmentForm = this.fb2.group({
      newDepartmentName: ['', Validators.required],
    });
    this.createEmployeeForm = this.fb.group({
      departmentId: ['', Validators.required],
      employeName: ['', Validators.required],
      employeSurname: ['', Validators.required],
      employeTelNO: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Phone number validation
    });
  }
  toggleAddDepartmentForm() {
    this.showAddDepartmentForm = !this.showAddDepartmentForm; // Form gösterimini tersine çevir
  }
  sil(){
    alert("sildim")
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
  async addNewDepartment() {
    if (this.departmentForm.valid) {
      // Burada yeni departman ekleme işlemini gerçekleştirin
      await this.createDepartment(this.departmentForm.value.newDepartmentName);
      await this.getDepartments();
      this.departmentForm.reset();
      this.showAddDepartmentForm = false;
    }
  }
  async createDepartment(name: string) {
    try {
      var result = await this.departmentService.create({ name });
      this.toastrService.message(result.message, 'Başarılı', {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight,
      });
    } catch (err) {
      this.toastrService.message(err.Message, 'Başarısız', {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight,
      });
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
