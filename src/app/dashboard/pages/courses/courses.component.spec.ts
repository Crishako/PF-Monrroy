import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from './services/course.service';
import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { MatCardModule } from '@angular/material/card';

class MockCourseService {
  getCourses(): Observable<any> {
   
    return of([]);
  }

}

describe('CoursesComponent', () => {
  let component: CoursesComponent;
  let fixture: ComponentFixture<CoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent, CoursesTableComponent], 
      imports: [MatDialogModule, HttpClientTestingModule, MatTableModule, MatCardModule], 
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: CourseService, useClass: MockCourseService },
      ],
    });

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear CoursesComponent', () => {
    expect(component).toBeTruthy();
  });
});
