import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store'; // Importa StoreModule
import { AuthService } from '../../services/auth.service';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}), 
      ],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear RegisterComponent', () => {
    expect(component).toBeTruthy();
  });
});
