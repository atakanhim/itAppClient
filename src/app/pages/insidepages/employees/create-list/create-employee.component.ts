import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Create_Employe_Request } from 'src/app/contracts/employee/requests';
import { Create_Employe_Response } from 'src/app/contracts/employee/responses';
import { List_User } from 'src/app/contracts/users/list_user';
import { CreateEmployeeDialogComponent } from 'src/app/dialogs/create-employee-dialog/create-employee-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
declare var $: any;

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent {

  constructor(private dialog: MatDialog,private employeeService:EmployeeService,private toastrService:CustomToastrService,private userAuthService:UserAuthService) {
    
  }
  @Output() refreshList = new EventEmitter<void>();

  ngOnInit() {
  }
   openCreateEmployeeModal() {
    const dialogRef = this.dialog.open(CreateEmployeeDialogComponent, {
      width: '600px', // Modal penceresinin genişliği
      data: { // Modal'a gönderilecek veri (opsiyonel)
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result as Create_Employe_Request){
        
        this.createEmployee(result);
      }
    });
  }

  async createEmployee(request: Create_Employe_Request) {
    this.userAuthService.loggedInUser$.subscribe((x) => {
      request.appUserId= x.Id;
      
    });    
    try{
      var result:Create_Employe_Response = await this.employeeService.create(request);
      if(result.succeeded){
        this.toastrService.message("Employe başarı ile eklendi", "Basarili", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomRight })
        this.refreshList.emit();

      }
    }
    catch(err){
      console.log(err);
      this.toastrService.message(err.Message, "Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomRight })

    }
    // Implement your function here
  }
}
