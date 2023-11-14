// Import necessary modules
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { LecturesTableComponent } from './lectures-table.component';

describe('LecturesTableComponent', () => {
  let component: LecturesTableComponent;
  let fixture: ComponentFixture<LecturesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LecturesTableComponent],
      imports: [MatTableModule],
    });

    fixture = TestBed.createComponent(LecturesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
