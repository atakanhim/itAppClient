import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { List_User } from 'src/app/contracts/users/list_user';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, NgIf } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Employe } from 'src/app/entities/employe';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEmployeeDialogComponent } from 'src/app/dialogs/update-employee-dialog/update-employee-dialog.component';
import { Update_Employe_Response } from 'src/app/contracts/employee/responses';
import { Update_Employe_Request } from 'src/app/contracts/employee/requests';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import { Router } from '@angular/router';
import { EmployeWithAllIncludesVM } from 'src/app/contracts/employee/employe_vm';
import { List_EmployeWithAllIncludes } from 'src/app/contracts/employee/list_employee';
@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatIconModule, DeleteDirective, MatIconModule],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  displayedColumns: string[] = ['employeName', 'employeSurname', 'employeTelNo', 'usedLeaveDays', 'department', "puantaj","actions"];
  dataSource = new MatTableDataSource<EmployeWithAllIncludesVM>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _user: List_User;
  constructor(private router: Router,private authUserService: UserAuthService, private employeeService: EmployeeService, private dialog: MatDialog, private toastrService: CustomToastrService) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 20;
  }
  async  ngOnInit() {
    await this.authUserService.loggedInUser$.subscribe(async (x) => {
      this._user = x as List_User;
      await this.loadEmployees();
    });
  }
  async edit(element: EmployeWithAllIncludesVM) {
    // edit işlemi yapılacak
    const dialogRef = this.dialog.open(UpdateEmployeeDialogComponent, {
      width: '600px', // Modal penceresinin genişliği
      data: element
    });

      await dialogRef.afterClosed().subscribe(async (result: Update_Employe_Request) => {
      try {
        if (result) 
         {
          var response = await this.employeeService.update(result);    
          await this.loadEmployees();  
          this.toastrService.message(response.message, "Güncelleme Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })
         }
      }
      catch (error) {
        console.log(error);
        this.toastrService.message(error.Message??"Employe update işlemi gerçekleştirilemedi", "Güncelleme Başarısız", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight })
      }
    });
  }

  async loadEmployees() {
    try {
      let listEmp: List_EmployeWithAllIncludes = await this.employeeService.getAllEmployeeForUser(this._user.Id);
      this.dataSource.data = listEmp.employees;
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }
  editEmployee(id: string) {
    // Çift tıklama olayında çağrılacak fonksiyon
    this.router.navigate(['admin/employees/edit', id]);

  }
}
