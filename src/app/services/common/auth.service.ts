import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = inject(JwtHelperService);
    
  identityCheck() {
    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    _isAuthenticated = token != null && !expired; // token null degilse ve expired olmamıssa
  }

  get isAuthenticated(): boolean {
    console.log(_isAuthenticated)
    return _isAuthenticated;
  }


}

export let _isAuthenticated: boolean;
