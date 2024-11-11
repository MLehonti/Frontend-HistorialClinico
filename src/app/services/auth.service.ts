// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://backend-historialclinico-2.onrender.com/api/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        console.log("Respuesta del servidor:", response);
        if (response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUsuarioId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.usuarioId || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  getUsuarioNombre(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        return decodedPayload.sub || null; // `sub` contiene el nombre de usuario en el token
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }
}
