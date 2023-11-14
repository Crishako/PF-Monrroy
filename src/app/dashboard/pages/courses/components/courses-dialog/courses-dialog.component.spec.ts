import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDialogComponent } from './courses-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CoursesDialogComponent', () => {
  let component: CoursesDialogComponent;
  let fixture: ComponentFixture<CoursesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesDialogComponent],
      imports:[HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
    });
    fixture = TestBed.createComponent(CoursesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
