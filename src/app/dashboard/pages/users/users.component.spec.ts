import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { MatCardModule } from '@angular/material/card'; // Añade la importación

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent, UsersTableComponent],
      imports: [
        StoreModule.forRoot({}),
        HttpClientModule,
        MatCardModule, // Añade el módulo de Angular Material aquí
      ],
      providers: [UserService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('UsersComponent debería ser creado', () => {
    expect(component).toBeTruthy();
  });
});
