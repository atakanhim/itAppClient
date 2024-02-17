import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { AuthService } from './services/common/auth.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SocialLoginModule } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxSpinnerModule,
    HttpClientModule, 
    SocialLoginModule,
],
  providers:[
     {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true },
     { provide:"baseUrl",useValue:"https://localhost:7185/",multi:true}
  ],
  template:`
  <div class="customdiv">red red </div>
  

  <!-- <ngx-spinner name="ballSpin" type="ball-spin"></ngx-spinner>
  <ngx-spinner name="ballAtom" type="ball-atom"></ngx-spinner> -->
  `,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(public authService:AuthService) {
    
  }
}
