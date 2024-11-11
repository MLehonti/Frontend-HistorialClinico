// src/app/services/triaje.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TriajeService {
  private apiUrl = 'http://localhost:8080/api/triajes';

  constructor(private http: HttpClient) {}

  // Método para obtener triajes por paciente ID
  obtenerTriajesPorPacienteId(pacienteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paciente/${pacienteId}`);
  }
}
