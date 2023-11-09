import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public isSidenavOpen = false;
  constructor(private authService: AuthService) {}

  public logOut(){
    console.log('aah');
    
    this.authService.logout();
  }
}
