import { Component } from '@angular/core';
import { CheckmarksService } from 'src/app/services/common/models/checkmarks.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

@Component({
  selector: 'app-checkmarks',
  standalone: true,
  imports: [],
  templateUrl: './checkmarks.component.html',
  styleUrl: './checkmarks.component.scss'
})
export class CheckmarksComponent {

  /**
   *
   */
  constructor(private employeeService:EmployeeService,private checkmarksService:CheckmarksService) {
    
  }
}
