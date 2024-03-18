import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { List_Employe } from 'src/app/contracts/employee/list_employee';
import { List_User } from 'src/app/contracts/users/list_user';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeVM } from 'src/app/contracts/employee/employe_vm';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Employe } from 'src/app/entities/employe';
import { DeleteDirective } from 'src/app/directives/delete.directive';
@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, MatIconModule,DeleteDirective],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent {
  displayedColumns: string[] = ['employeName', 'employeSurname', 'employeTelNo', 'usedLeaveDays', 'department', "actions"];
  dataSource = new MatTableDataSource<EmployeVM>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _user: List_User;
  constructor(private authUserService: UserAuthService, private employeeService: EmployeeService) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 20;
  }
  ngOnInit() {

    this.authUserService.loggedInUser$.subscribe((x) => {
      this._user = x as List_User;
      this.loadEmployees();
    });

  }


  async loadEmployees() {
    try {
      let listEmp: List_Employe = await this.employeeService.getAllEmployeeForUser(this._user.Id);
      this.dataSource.data = listEmp.employees;
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }
 
}
