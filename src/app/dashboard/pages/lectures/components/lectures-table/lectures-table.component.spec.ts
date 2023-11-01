import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturesTableComponent } from './lectures-table.component';

describe('LecturesTableComponent', () => {
  let component: LecturesTableComponent;
  let fixture: ComponentFixture<LecturesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesTableComponent]
    });
    fixture = TestBed.createComponent(LecturesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
