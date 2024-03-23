import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesComponent } from '../employees.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {
  employeeId: string;
  constructor(private route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = params['employeeId']; // URL'deki 'employeeId' parametresini alıyoruz

    });
  }
}
