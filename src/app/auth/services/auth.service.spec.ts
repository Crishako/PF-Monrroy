import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';
import { MatCardModule } from '@angular/material/card';
import { User } from '../models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/dashboard/pages/home/home.component';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let apiUrl = 'https://654bf2e15b38a59f28eff3b9.mockapi.io/api/v1/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatCardModule,  RouterTestingModule.withRoutes([
        { path: 'dashboard/home', component: HomeComponent },
      ]),],
      providers: [AuthService, provideMockStore()],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify(); // Ensure there are no outstanding requests
  });

  it('Auth Service debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debe establecer un usuario autenticado al hacer login()', () => {
    const USER_MOCK: User = {
      id: 1, // Cambiado de '1' a 1
      email: 'fake@mail.com',
      lastname: 'fakeLastName',
      name: 'fakeName',
      token: '84jfdskfsdjh3m2nudisfdusafjd',
      password: '123456',
      role: 'ADMIN'
    };
  
    service.login({
      email: USER_MOCK.email,
      password: USER_MOCK.password,
    });
  
    const req = httpController.expectOne({
      method: 'GET',
      url: `${apiUrl}/users?email=${USER_MOCK.email}&password=${USER_MOCK.password}`,
    });
  
    req.flush([USER_MOCK]);
  
    service.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(USER_MOCK);
      },
    });
  });
  
});
