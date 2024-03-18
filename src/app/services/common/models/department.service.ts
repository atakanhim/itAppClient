import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { List_Department, Single_Department } from 'src/app/contracts/department/list_department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpClientService: HttpClientService) { }
  private employeesSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  employees$: Observable<any> = this.employeesSubject.asObservable();

  async create(department: any): Promise<any> {
    const observable: Observable<any | any> = this.httpClientService.post<any | any>({
      controller: "department",
      action: "create"
    }, department);


    return await firstValueFrom(observable) as any;
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
   return listDepartments;
  }


  removeLoggedUser() {
    this.employeesSubject.next(null);
  }
  pushLoggedUser(employees: any) {
    this.employeesSubject.next(employees);
  }
}
