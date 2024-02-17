import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              allowedDomains: ["example.com"],
              disallowedRoutes: ["http://example.com/examplebadroute/"],
          },
      }),
  ),
  provideHttpClient(
      withInterceptorsFromDi()
  ),
  ]
};
