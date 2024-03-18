import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { List_Employe } from 'src/app/contracts/employee/list_employee';
import { List_User } from 'src/app/contracts/users/list_user';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { ListEmployeesComponent } from "./list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./create-list/create-employee.component";

@Component({
    selector: 'app-employees',
    standalone: true,
    templateUrl: './employees.component.html',
    styleUrl: './employees.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ListEmployeesComponent,
        CreateEmployeeComponent
    ]
})
export class EmployeesComponent{ 

    @ViewChild('listEmployeesComponent') listEmployeesComponent: ListEmployeesComponent;

    refreshEmployeeList() {
        this.listEmployeesComponent.loadEmployees();
      }

 

}
