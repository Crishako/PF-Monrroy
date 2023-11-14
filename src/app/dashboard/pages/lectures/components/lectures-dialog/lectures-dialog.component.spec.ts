import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesDialogComponent } from './lectures-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LecturesDialogComponent', () => {
  let component: LecturesDialogComponent;
  let fixture: ComponentFixture<LecturesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesDialogComponent],
      imports:[HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} }, 
      ],
    });
    fixture = TestBed.createComponent(LecturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
