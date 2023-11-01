import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  constructor(private router: Router) {
    // Inicialmente, establece isActive según la ruta actual
    this.isActive = this.router.isActive('/dashboard/home', true);
  }

  isActive: boolean;

  // Función para cambiar el estado activo
  setActive(isActive: boolean) {
    this.isActive = isActive;
  }
}
