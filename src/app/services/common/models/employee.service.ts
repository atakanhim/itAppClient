import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Create_Employe_Response, Update_Employe_Response } from 'src/app/contracts/employee/responses';
import { Create_Employe_Request, Update_Employe_Request } from 'src/app/contracts/employee/requests';
import { List_EmployeWithAllIncludes, Single_EmployeWithAllIncludes, Single_EmployeWithCheckMarks } from 'src/app/contracts/employee/list_employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClientService: HttpClientService) { }
 

  async create(employe: Create_Employe_Request): Promise<Create_Employe_Response> {
    const observable: Observable<Create_Employe_Response | Create_Employe_Request> = this.httpClientService.post<Create_Employe_Response | Create_Employe_Request>({
      controller: "employee",
      action: "create"
    }, employe);


    return await firstValueFrom(observable) as Create_Employe_Response;
  }
  async update(employe: Update_Employe_Request): Promise<Update_Employe_Response> {
    const observable: Observable<Update_Employe_Request | Update_Employe_Response> = this.httpClientService.put<Update_Employe_Request | Update_Employe_Response>({
      controller: "employee",
      action: "update"
    }, employe);


    return await firstValueFrom(observable) as Update_Employe_Response;
  }
  async get(employeeId: string): Promise<Single_EmployeWithAllIncludes> {
    const observable: Observable<Single_EmployeWithAllIncludes | string> = this.httpClientService.get<Single_EmployeWithAllIncludes | string>({
      controller: "Employee",
      action: "GetEmployee",
      queryString:`EmployeeId=${employeeId}`
    });

    
   let singleEmployee = await firstValueFrom(observable) as Single_EmployeWithAllIncludes;
   return singleEmployee;

  
  }
  async getEmployeeWithCheckMark(employeeId: string): Promise<Single_EmployeWithCheckMarks> {
    const observable: Observable<Single_EmployeWithCheckMarks | string> = this.httpClientService.get<Single_EmployeWithCheckMarks | string>({
      controller: "Employee",
      action: "GetEmployeeWithCheckMark",
      queryString:`EmployeeId=${employeeId}`
    });

    
   let singleEmployee = await firstValueFrom(observable) as Single_EmployeWithCheckMarks;
   return singleEmployee;

  
  }
  async getAllEmployeeForUser(userId: string): Promise<List_EmployeWithAllIncludes> {
    const observable: Observable<List_EmployeWithAllIncludes | string> = this.httpClientService.get<List_EmployeWithAllIncludes | string>({
      controller: "Employee",
      action: "GetAllEmployeesForUser",
      queryString:`UserId=${userId}`
    });

   let listEmployees = await firstValueFrom(observable) as List_EmployeWithAllIncludes;
   return listEmployees;

  }


}
