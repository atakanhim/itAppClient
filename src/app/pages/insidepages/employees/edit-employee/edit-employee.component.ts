import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesComponent } from '../employees.component';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { Single_Employe } from 'src/app/contracts/employee/list_employee';
import { EmployeVM } from 'src/app/contracts/employee/employe_vm';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  employeeId: string;
  constructor(private route:ActivatedRoute,private employeeService:EmployeeService) {
    
  }
 async ngOnInit() {
    await this.route.params.subscribe(async (params) => {
      this.employeeId = params['employeeId']; // URL'deki 'employeeId' parametresini alıyoruz
      var emp:Single_Employe = await this.employeeService.get(this.employeeId);
      var employee:EmployeVM=emp.employee;
      console.log(employee);
    });

  }
}
