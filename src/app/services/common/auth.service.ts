import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAuthService } from './models/user-auth.service';
import { UserService } from './models/user.service';
import { List_User } from 'src/app/contracts/list_user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userService = inject(UserService);
  private userAuthService = inject(UserAuthService);
  private jwtHelper = inject(JwtHelperService);

   async identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    if(token){
    
    }
   
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired; // token null degilse ve expired olmamıssa

    if(_isAuthenticated){ // egerboyleyse giren kişinnin bilgilerini atıyoruz user
      const decodedToken : ResponseToken= this.jwtHelper.decodeToken(token); // Retrieve the data in the
      const  _username=decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
      const  userList:List_User = await this.userService.get(_username);
      this.userAuthService.pushLoggedUser(userList) ;
      console.log(userList);
    }
  }

  get isAuthenticated(): boolean {
    console.log(_isAuthenticated)
    return _isAuthenticated;
  }


}

export let _isAuthenticated: boolean;

export type ResponseToken = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name':string,
  'exp': number, 
  'nbf': number, 
  'iss': string, 
  'aud': string
}