import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersDialogComponent } from './users-dialog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersModule } from '../../users.module';
import { userFeature, reducer } from '../../store/user.reducer';
import { UserEffects } from '../../store/user.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importa MatDialogRef y MAT_DIALOG_DATA

describe('UsersDialogComponent', () => {
  let component: UsersDialogComponent;
  let fixture: ComponentFixture<UsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsersModule,
        StoreModule.forRoot({ reducer }),
        EffectsModule.forRoot([UserEffects]),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(UsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('UsersDialog debería ser creado', () => {
    expect(component).toBeTruthy();
  });
});
