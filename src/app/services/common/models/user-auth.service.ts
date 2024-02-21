import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';

import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { Login_Users } from 'src/app/contracts/users/login_user';

import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../admin/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/TokenResponse';
import { SocialUser } from '@abacritt/angularx-social-login';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService,private authService:AuthService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message
   
  }

  async login(usernameOrEmail:string,password:string,callbackFunction?:()=>void):Promise<any>{
    const loginUser = new Login_Users();
    loginUser.Password=password;
    loginUser.UsernameOrEmail=usernameOrEmail;
    const observable: Observable<any | TokenResponse> =  this.httpClientService.post<any | TokenResponse>({controller:"auth",action:"login"},loginUser);
    const tokenResponse:TokenResponse = await firstValueFrom(observable).catch(error=> {
      console.log(error)
     } ) as TokenResponse;
     
    if(tokenResponse)
    {
      localStorage.setItem("accessToken",tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.authService.identityCheck();
     }
    else{
      return tokenResponse;
    }

    callbackFunction && callbackFunction();

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
      // this.toastrService.message("google login basarili","Basarili",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight})
    }

    callbackFunction()

  }

}
