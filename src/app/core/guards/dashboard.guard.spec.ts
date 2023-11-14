import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardGuard } from './dashboard.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardGuard', () => {
  let guard: DashboardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [DashboardGuard],
    });

    guard = TestBed.inject(DashboardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
