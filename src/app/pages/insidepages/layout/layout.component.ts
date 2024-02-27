import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,RouterLink,MatSidenavModule,MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router:Router, public authService:AuthService,private toastrService: CustomToastrService,public userAuthService:UserAuthService) {

  }
  logout(){
    localStorage.removeItem('accessToken');

    this.authService.identityCheck();
    this.userAuthService.removeLoggedUser();
    this.router.navigate([""]);
    this.toastrService.message("Çıkış Başarılı","Basarili",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight})

  }
}
