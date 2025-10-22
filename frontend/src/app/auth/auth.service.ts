import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = 'http://localhost:5243/api/auth';

    constructor(private http: HttpClient) { }

    login(credentials: { username: string; password: string }): Observable<any> {
        console.log('Intentando login con:', credentials); // log de credenciales (ojo: solo para debug, no dejar en producción)
        return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
            tap((res: any) => {
                console.log('Respuesta del login:', res); // log de la respuesta de la API
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    console.log('Token guardado en localStorage:', res.token);
                } else {
                    console.log('No se recibió token en la respuesta.');
                }
            })
        );
    }

    logout() {
        console.log('Cerrando sesión, eliminando token...');
        localStorage.removeItem('token');
    }

    isLoggedIn(): boolean {
        const loggedIn = !!localStorage.getItem('token');
        console.log('isLoggedIn:', loggedIn);
        return loggedIn;
    }

    getToken(): string | null {
        const token = localStorage.getItem('token');
        console.log('getToken:', token);
        return token;
    }
}
