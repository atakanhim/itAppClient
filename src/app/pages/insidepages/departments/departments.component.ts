import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { slideInOutAnimation } from 'src/app/animations/slideInOut-animation';
import { Department_VM } from 'src/app/contracts/department/department_vm';
import { List_Department } from 'src/app/contracts/department/list_department';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { DepartmentService } from 'src/app/services/common/models/department.service';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule,MatIconModule,DeleteDirective, ReactiveFormsModule, FormsModule ],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss',
  animations: [slideInOutAnimation]
})
export class DepartmentsComponent {
  showAddDepartmentForm: boolean = false; 
  departmentForm: FormGroup;

   public departments:Department_VM[];
  constructor(private departmentService:DepartmentService,private toastrService:CustomToastrService,   private fb2: FormBuilder    ) {
    
  }
  async ngOnInit() {
    this.departmentForm = this.fb2.group({
      newDepartmentName: ['', Validators.required],
    });

    await this.loadDepartments();

  }
  editDepartment(){
   
  }
  toggleAddDepartmentForm() {
    this.showAddDepartmentForm = !this.showAddDepartmentForm; // Form gösterimini tersine çevir
  }
  async addNewDepartment() {
    if (this.departmentForm.valid) {
      // Burada yeni departman ekleme işlemini gerçekleştirin
      await this.createDepartment(this.departmentForm.value.newDepartmentName);
      await this.loadDepartments();
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
  async loadDepartments(){
   try{
    var result:List_Department = await this.departmentService.getAllDepartments();
    console.log(result.departments);
    var departs = result.departments;
    this.departments =  departs ;

   }
   catch(e){
    console.log(e);
   }
  }
}
