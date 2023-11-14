import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table'; // Asegúrate de importar MatTableModule

import { CoursesTableComponent } from './components/courses-table/courses-table.component';

describe('CoursesTableComponent', () => {
  let component: CoursesTableComponent;
  let fixture: ComponentFixture<CoursesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesTableComponent],
      imports: [MatTableModule], // Agrega MatTableModule aquí
    });
    fixture = TestBed.createComponent(CoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
