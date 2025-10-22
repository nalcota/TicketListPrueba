import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token');
        console.log('Interceptor: token encontrado =', token);

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            console.log('Interceptor: headers =', cloned.headers.keys());
            return next.handle(cloned);
        }

        console.log('Interceptor: no hay token, enviando request sin Authorization');
        return next.handle(req);
    }
}
