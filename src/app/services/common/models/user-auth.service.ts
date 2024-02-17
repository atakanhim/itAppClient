import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

import { Observable, firstValueFrom } from 'rxjs';
import { Login_Users } from 'src/app/contracts/users/login_user';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../admin/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/TokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,private toastrService:CustomToastrService) { }

  async login(usernameOrEmail:string,password:string,callbackFunction?:()=>void):Promise<any>{

    const loginUser = new Login_Users();
    loginUser.Password=password;

    loginUser.UsernameOrEmail=usernameOrEmail;
    const observable: Observable<any | TokenResponse> =  this.httpClientService.post<any | TokenResponse>({controller:"auth",action:"login"},loginUser)

     const tokenResponse:TokenResponse = await firstValueFrom(observable).catch(error=>console.log(error) ) as TokenResponse;
     console.log(tokenResponse);

    if(tokenResponse)
    {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("login basarili","Basarili",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    }
    callbackFunction();


  }
  async refreshTokenLogin(refreshToken: string, callBackFunction?: (state) => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshtokenlogin",
      controller: "auth"
    }, { refreshToken: refreshToken });

    try {
      const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

      if (tokenResponse) {
        localStorage.setItem("accessToken", tokenResponse.token.accessToken);
        localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      }

      callBackFunction(tokenResponse ? true : false);
    } catch {
      callBackFunction(false);
    }
  }

  async googlelogin(user:SocialUser,callbackFunction?:()=>void):Promise<any>{
    const observable:Observable<any> =this.httpClientService.post<SocialUser | TokenResponse>({
      controller:"auth",
      action:"google-login"
    },user);

    const tokenResponse = await firstValueFrom(observable).catch(err=>console.log(err)) as TokenResponse;
    if(tokenResponse)
    {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrService.message("google login basarili","Basarili",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    }

    callbackFunction()

  }

}
