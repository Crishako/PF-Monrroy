import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table'; // Añade esta importación
import { reducer } from '../../store/user.reducer';
import { UserEffects } from '../../store/user.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersTableComponent],
      imports: [
        StoreModule.forRoot({ reducer }), 
        EffectsModule.forRoot([UserEffects]), 
        HttpClientTestingModule,
        MatTableModule,
        MatCardModule, // Agrega esta línea para importar MatCardModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear componente', () => {
    expect(component).toBeTruthy();
  });
});
