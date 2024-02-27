import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User_Request, Create_User_Response } from 'src/app/contracts/users/create_user';
import { Observable, firstValueFrom } from 'rxjs';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../admin/custom-toastr.service';
import { List_User } from 'src/app/contracts/list_user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService: HttpClientService) { }

  async create(user: Create_User_Request): Promise<Create_User_Response> {
    const observable: Observable<Create_User_Response | Create_User_Request> = this.httpClientService.post<Create_User_Response | Create_User_Request>({
      controller: "users",
      action: "create"
    }, user);


    return await firstValueFrom(observable) as Create_User_Response;
  }

  async get(username: string): Promise<List_User> {
    const observable: Observable<List_User | string> = this.httpClientService.get<List_User | string>({
      controller: "users",
      action: "GetUser",
      queryString:`username=${username}`
    });

   return await firstValueFrom(observable) as any;

  
  }

}
