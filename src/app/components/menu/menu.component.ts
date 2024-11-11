// src/app/components/menu/menu.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Asegúrate de importar RouterModule aquí
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 constructor(private router: Router) {} // Inyecta el Router aquí

    
  logout() {
    // Lógica para cerrar sesión, por ejemplo, limpiar el token o redirigir a login
    localStorage.removeItem('token'); // o sessionStorage.removeItem('token') si estás usando sessionStorage

    console.log("Sesión cerrada");
    this.router.navigate(['/login']);
  }
}
