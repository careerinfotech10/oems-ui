import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

const TOKEN_HEADER = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService) { }

    id:number=0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let authReq = req;
        this.id=this.id+1;
        const token = this.login.getToken();
        console.log(this.id+'intercpter ' + token);
        if (token != null) {
            authReq = authReq.clone(
                {
                    setHeaders: { Authorization: `Bearer ${token}` }
                });
        }
        console.log(this.id+'authReq'+authReq.headers+' url '+authReq.url);
        return next.handle(authReq);
    }

}

export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,

        multi: true
    }
]