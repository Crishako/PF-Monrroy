import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';

import { CoursesTableComponent } from './courses-table.component';
import { MatCardModule } from '@angular/material/card';

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesTableComponent],
      imports: [MatTableModule, MatCardModule],
    });
    fixture = TestBed.createComponent(CoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear CoursesTableComponent', () => {
    expect(component).toBeTruthy();
  });
});
