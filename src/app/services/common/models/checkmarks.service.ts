import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { List_CheckMark } from 'src/app/contracts/checkmark/list_checkmark';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CheckmarksService {
  constructor(private httpClientService: HttpClientService) { }

  async getCheckmarksWithEmployeeId(employeeId: string): Promise<List_CheckMark> {
    const observable: Observable<List_CheckMark | string> = this.httpClientService.get<List_CheckMark | string>({
      controller: "CheckMark",
      action: "GetCheckmarksWithEmployeeId",
      queryString:`EmployeeId=${employeeId}`
    });

    
   let result = await firstValueFrom(observable) as List_CheckMark;
   return result;
  }
  
}
