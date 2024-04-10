import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { List_User } from 'src/app/contracts/users/list_user';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { ListEmployeesComponent } from "./main-employees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./main-employees/create-list/create-employee.component";
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { MainEmployeesComponent } from "./main-employees/main-employees.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    MainEmployeesComponent,
    EditEmployeeComponent
  ]
})
export class EmployeesComponent {
  pageTitle: string = '';
  routerEventsSubscription: Subscription;
  constructor(private router: Router, private employeService: EmployeeService, private cdr: ChangeDetectorRef) {

  }

  async ngOnInit() {

    await this.subscribeToRouterEvents();
    await this.updatePageTitle(this.router.url);

  }

  private async subscribeToRouterEvents() {
    await this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        if (event.url.includes("/admin/employees"))
          await this.updatePageTitle(event.urlAfterRedirects);
      });
  }
  private async updatePageTitle(url: string): Promise<void> {
    if (url === '/admin/employees')
      this.pageTitle = '';
    else {

      const urlParts = url.split('/');
      //const edit = urlParts[urlParts.length - 2];
      const employeeId = urlParts[urlParts.length - 1];
      const employee = await this.employeService.get(employeeId);
      const empName = employee.employee.employeName;
      this.pageTitle = `/ ${empName.charAt(0).toUpperCase() + empName.slice(1)}`;
      this.cdr.detectChanges(); // Değişiklik algılaması yap

    }
  }
}
