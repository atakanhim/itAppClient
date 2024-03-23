import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CheckMarkVM } from 'src/app/contracts/checkmark/checkmark_vm';
import { EmployeVM } from 'src/app/contracts/employee/employe_vm';
import { List_Employe } from 'src/app/contracts/employee/list_employee';
import { List_User } from 'src/app/contracts/users/list_user';
import { DeleteDirective } from 'src/app/directives/delete.directive';
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-checkmarks',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatIconModule, DeleteDirective, MatIconModule],
  templateUrl: './checkmarks.component.html',
  styleUrl: './checkmarks.component.scss'
})
export class CheckmarksComponent {
  private _user: List_User;
  _employees:EmployeVM[];
  constructor(private authUserService: UserAuthService,private employeeService:EmployeeService,private checkmarksService:CheckmarksService) {
    
  }
 async  ngOnInit() {
    await this.authUserService.loggedInUser$.subscribe(async (x) => {
      this._user = x as List_User;
      await this.loadEmployees();
    });
  }
 async edit(element: any) {
    // edit işlemi yapılacak
    console.log(element);
   
  }

  async loadEmployees() {
    try {
      let listEmp: List_Employe = await this.employeeService.getAllEmployeeForUser(this._user.Id);
      this._employees = listEmp.employees;
      
      console.log(this._employees);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }
}
