import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { StoksComponent } from '../stoks/stoks.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/admin/custom-toastr.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,StoksComponent,DashboardComponent,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router:Router, public authService:AuthService,private toastrService: CustomToastrService) {

  }
  logout(){
    localStorage.removeItem('accessToken');

    this.authService.identityCheck();
    this.router.navigate([""]);

    this.toastrService.message("Çıkış Başarılı","Basarili",{messageType:ToastrMessageType.Info,position:ToastrPosition.BottomRight})

  }
}
