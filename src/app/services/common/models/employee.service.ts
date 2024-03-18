import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Create_Employe_Request, Create_Employe_Response } from 'src/app/contracts/employee/create_employee';
import { List_Employe, Single_Employe } from 'src/app/contracts/employee/list_employee';

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

  async get(employeeId: string): Promise<Single_Employe> {
    const observable: Observable<Single_Employe | string> = this.httpClientService.get<Single_Employe | string>({
      controller: "Employee",
      action: "GetEmployee",
      queryString:`EmployeeId=${employeeId}`
    });

    
   let singleEmployee = await firstValueFrom(observable) as Single_Employe;
   return singleEmployee;

  
  }
  async getAllEmployeeForUser(userId: string): Promise<List_Employe> {
    const observable: Observable<List_Employe | string> = this.httpClientService.get<List_Employe | string>({
      controller: "Employee",
      action: "GetAllEmployeesForUser",
      queryString:`UserId=${userId}`
    });

   let listEmployees = await firstValueFrom(observable) as List_Employe;
   return listEmployees;

  }


}
