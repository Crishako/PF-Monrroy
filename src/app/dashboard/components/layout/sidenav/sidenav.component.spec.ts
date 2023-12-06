import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

class MockAuthService {

}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        MatSidenavModule,
        MatListModule,
        BrowserAnimationsModule,
        RouterModule,
        RouterTestingModule,
        HttpClientModule,
        MatIconModule
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear SidenavComponent', () => {
    expect(component).toBeTruthy();
  });
});
