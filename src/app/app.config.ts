import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtService } from './auth/services/jwt.service';
import { IsLoggedInGuard } from './auth/jwtGuard';
import { authInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/services/auth.service';
import { SessionService } from './auth/services/session.service';
import { SessionStorageService } from './util/storage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])),
    IsLoggedInGuard, 
    JwtService, 
    AuthService,
    SessionService,
    SessionStorageService,
  ]
};
