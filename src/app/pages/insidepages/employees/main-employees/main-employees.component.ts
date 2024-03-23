import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ListEmployeesComponent } from '../list-employees/list-employees.component';
import { CreateEmployeeComponent } from '../create-list/create-employee.component';
import { ActivatedRoute } from '@angular/router';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'app-main-employees',
  standalone: true,
  imports: [
    CommonModule,
    ListEmployeesComponent,
    CreateEmployeeComponent
  ],
  templateUrl: './main-employees.component.html',
  styleUrl: './main-employees.component.scss'
})
export class MainEmployeesComponent {
  @ViewChild('listEmployeesComponent') listEmployeesComponent: ListEmployeesComponent;
  constructor(private route:ActivatedRoute) {}
  refreshEmployeeList() {
      this.listEmployeesComponent.loadEmployees();
    }

}
