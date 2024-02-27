import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, RouterModule, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientService } from './services/common/http-client.service';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true },
    {provide:"baseUrl",useValue:"https://localhost:7067",multi:true},
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["localhost:7067"],
              disallowedRoutes: [""],
          },
      })
     ),
    provideAnimationsAsync(), // required animations providers
    provideToastr(), // Toastr providers
    PreloadAllModules,
    provideHttpClient(
        withInterceptorsFromDi()
    ), provideAnimationsAsync(),
  ]
};
