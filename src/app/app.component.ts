import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/common/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SocialLoginModule } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, SocialLoginModule,NgxSpinnerModule],
  providers:[
 
  ],
  template:`
  <router-outlet></router-outlet>
  <ngx-spinner name="ballSpin" type="ball-spin"></ngx-spinner>
  <ngx-spinner name="ballAtom" type="ball-atom"></ngx-spinner>
  `,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(public authService:AuthService) {
    this.initialize();
  }
  private async initialize() {
    await this.authService.identityCheck();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
