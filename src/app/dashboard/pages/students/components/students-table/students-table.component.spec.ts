import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { StudentsTableComponent } from './students-table.component';

describe('StudentsTableComponent', () => {
  let component: StudentsTableComponent;
  let fixture: ComponentFixture<StudentsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsTableComponent],
      imports: [MatCardModule], // Agrega MatCardModule aquí
    });
    fixture = TestBed.createComponent(StudentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
