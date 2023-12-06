import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardGuard } from './dashboard.guard'; 
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

describe('DashboardGuard', () => {
  let guard: DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        DashboardGuard,
        {
          provide: AuthService,
          useValue: {
            authUser$: of({}),
          },
        },
        {
          provide: Store,
          useValue: {
            select: () => of(null),
          },
        },
      ],
    });

    guard = TestBed.inject(DashboardGuard);
  });

  it('Debería ser creado', () => {
    expect(guard).toBeTruthy();
  });
});
