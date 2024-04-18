import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_CheckMarks_Employee } from 'src/app/contracts/checkmark/list_checkmarks';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_CheckMark_Request } from 'src/app/contracts/checkmark/requests';
import { Create_CheckMark_Response } from 'src/app/contracts/checkmark/responses';
import { List_CheckMark } from 'src/app/contracts/checkmark/list_checkmark';

@Injectable({
  providedIn: 'root'
})
export class CheckmarksService {
  constructor(private httpClientService: HttpClientService) { }

  async create(checkmark: Create_CheckMark_Request): Promise<Create_CheckMark_Response> {
    const observable: Observable<Create_CheckMark_Response | Create_CheckMark_Request> = this.httpClientService.post<Create_CheckMark_Response | Create_CheckMark_Request>({
      controller: "checkmark",
      action: "create"
    }, checkmark);


    return await firstValueFrom(observable) as Create_CheckMark_Response;
  }
  async getCheckmarksWithEmployeeId(employeeId: string,currentMonth:number): Promise<List_CheckMarks_Employee> {
    const observable: Observable<List_CheckMarks_Employee | string> = this.httpClientService.get<List_CheckMarks_Employee | string>({
      controller: "CheckMark",
      action: "GetCheckmarksWithEmployeeId",
      queryString:`EmployeeId=${employeeId}&Month=${currentMonth}`
    });

   let list_CheckMarks_Employee = await firstValueFrom(observable) as List_CheckMarks_Employee;
   return list_CheckMarks_Employee;

  }

  
}
