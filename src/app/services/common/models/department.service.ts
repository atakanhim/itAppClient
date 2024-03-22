import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { List_Department, Single_Department } from 'src/app/contracts/department/list_department';
import { Create_Department_Request, Create_Department_Response } from 'src/app/contracts/department/department_request';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService: HttpClientService) { }
  private departmentsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  departments$: Observable<any> = this.departmentsSubject.asObservable();

  async create(department: Create_Department_Request): Promise<Create_Department_Response> {
    const observable: Observable<Create_Department_Request | Create_Department_Response> = this.httpClientService.post<Create_Department_Request | Create_Department_Response>({
      controller: "Department",
      action: "Create"
    }, department);

    var ma =  await firstValueFrom(observable) as Create_Department_Response;
    return ma;
  }

  async get(departmentId: string): Promise<Single_Department> {
    const observable: Observable<Single_Department | string> = this.httpClientService.get<Single_Department | string>({
      controller: "department",
      action: "getDepartment",
      queryString:`DepartmentId=${departmentId}`
    });

    
   let singleEmployee = await firstValueFrom(observable) as Single_Department;
   return singleEmployee;

  
  }
  async getAllDepartments(): Promise<List_Department> {
    const observable: Observable<List_Department | string> = this.httpClientService.get<List_Department | string>({
      controller: "Department",
      action: "GetAll",
    });
   let listDepartments = await firstValueFrom(observable) as List_Department;
   this.pushDepartments(listDepartments);
   return listDepartments;
  }


  removeDepartments() {
    this.departmentsSubject.next(null);
  }
  pushDepartments(employees: any) {
    this.departmentsSubject.next(employees);
  }
}
