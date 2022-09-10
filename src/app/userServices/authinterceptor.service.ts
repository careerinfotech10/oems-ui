import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()  //{providedIn: 'root'}
export class AuthinterceptorService implements HttpInterceptor {
  constructor(private login: LoginService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // add the jwt token (localStorage) request
      let authReq = httpRequest;
      const token = this.login.getToken();

      console.log("inside interceptor");

      if (token != null) {
          authReq = authReq.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
      return next.handle(authReq);

      // return next.handle(httpRequest);
  }
}

export const AuthInterceptorProviders = [
    {
        provider: HTTP_INTERCEPTORS,
        useClass: AuthinterceptorService,
        multi: true,
    }
]
