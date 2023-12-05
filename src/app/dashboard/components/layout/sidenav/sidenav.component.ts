import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService) {
    // Inicialmente, establece isActive según la ruta actual
    this.isActive = this.router.isActive('/dashboard/home', true);
    this.authUser$ = this.authService.authUser$;
  }

  get role$(): Observable<string | undefined> {
    return this.authUser$.pipe(map((user) => user?.role));
  }
  
  isActive: boolean;

  // Función para cambiar el estado activo
  setActive(isActive: boolean) {
    this.isActive = isActive;
  }

  @Output()
  logOut = new EventEmitter();
}
