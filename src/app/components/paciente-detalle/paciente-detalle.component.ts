// src/app/components/paciente-detalle/paciente-detalle.component.ts

import { Component, OnInit } from '@angular/core';
import { TriajeService } from '../../services/triaje.service';
import { UsuarioService } from '../../services/user.service';
import { DiagnosticoService } from '../../services/diagnostico.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-paciente-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule,MenuComponent],
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.css']
})
export class PacienteDetalleComponent implements OnInit {
  triajes: any[] = [];
  antecedentes: any[] = [];
  diagnosticos: any[] = [];
  pacienteId: number | null = null;

  constructor(
    private triajeService: TriajeService,
    private userService: UsuarioService,
    private diagnosticoService: DiagnosticoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.pacienteId = this.authService.getUsuarioId();
    if (this.pacienteId) {
      this.obtenerTriajes();
      this.obtenerAntecedentes();
      this.obtenerDiagnosticos();
    }
  }

  obtenerTriajes(): void {
    this.triajeService.obtenerTriajesPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.triajes = data;
      },
      (error) => {
        console.error('Error al obtener triajes:', error);
      }
    );
  }

  obtenerAntecedentes(): void {
    this.userService.obtenerAntecedentesPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.antecedentes = data;
      },
      (error) => {
        console.error('Error al obtener antecedentes:', error);
      }
    );
  }

  obtenerDiagnosticos(): void {
    this.diagnosticoService.obtenerDiagnosticosPorPacienteId(this.pacienteId!).subscribe(
      (data) => {
        this.diagnosticos = data;
      },
      (error) => {
        console.error('Error al obtener diagnósticos:', error);
      }
    );
  }
}
