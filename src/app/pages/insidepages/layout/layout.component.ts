import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { StoksComponent } from '../stoks/stoks.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,StoksComponent,DashboardComponent,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  constructor(private router:Router, public authService:AuthService) {

  }
  logout(){
    localStorage.removeItem('accessToken');
    this.authService.identityCheck();
    this.router.navigate(["admin"]);
    this.router.navigate[""];
  }
}
