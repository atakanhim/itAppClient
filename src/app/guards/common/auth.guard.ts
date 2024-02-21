import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "src/app/base/base.component";
import { _isAuthenticated } from "src/app/services/common/auth.service";
import { CustomToastrService, ToastrMessageType, ToastrPosition } from "src/app/services/admin/custom-toastr.service";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,private jwtHelper:JwtHelperService,private toastrService:CustomToastrService,private spinner:NgxSpinnerService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.spinner.show(SpinnerType.BallSpin);

    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum acmaniz gerekiyor!", "Yetkisiz Erişim!", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }
    this.spinner.hide(SpinnerType.BallSpin);
    return true;
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean {
    if (_isAuthenticated) {
      this.router.navigate(["admin/"]);
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next, state);
}
export const AuthGuardChield: CanActivateChildFn =  (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionsService).canActivate(childRoute, state);
}
export const isMatch: CanMatchFn = (route: Route, segments: UrlSegment[]): boolean => {
  return inject(PermissionsService).canMatch(route, segments);
}
