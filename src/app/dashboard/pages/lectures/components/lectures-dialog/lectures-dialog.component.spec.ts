import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesDialogComponent } from './lectures-dialog.component';

describe('LecturesDialogComponent', () => {
  let component: LecturesDialogComponent;
  let fixture: ComponentFixture<LecturesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesDialogComponent]
    });
    fixture = TestBed.createComponent(LecturesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
