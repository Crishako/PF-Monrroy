// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsDialogComponent } from './students-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentsDialogComponent', () => {
  let component: StudentsDialogComponent;
  let fixture: ComponentFixture<StudentsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
    });

    fixture = TestBed.createComponent(StudentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear StudentsDialogComponent', () => {
    expect(component).toBeTruthy();
  });
});
