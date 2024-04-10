import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesComponent } from '../employees.component';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import {  EmployeWithNothingVM, EmployeeWithCheckMarkVM } from 'src/app/contracts/employee/employe_vm';
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { List_CheckMark } from 'src/app/contracts/checkmark/list_checkmark';
import { CheckMarkWithEmployeeVM } from 'src/app/contracts/checkmark/checkmark_vm';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule,NgIf],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
 currentEmployee : EmployeeWithCheckMarkVM;
  constructor(private route:ActivatedRoute,private employeeServicew:EmployeeService,    private cdr: ChangeDetectorRef
  ) {
    
  }
 async ngOnInit() {
    await this.route.params.subscribe(async (params) => {
      let employeeId = params['employeeId']; // URL'deki 'employeeId' parametresini alıyoruz
      let result = await this.employeeServicew.getEmployeeWithCheckMark(employeeId);
      this.currentEmployee=result.employee;
      this.cdr.detectChanges();

    });

  }
}
