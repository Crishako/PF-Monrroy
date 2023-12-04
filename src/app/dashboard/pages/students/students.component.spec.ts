import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './students.component';
import { StudentService } from './services/student.service'; 
import { MatDialogModule } from '@angular/material/dialog';
import { StudentsTableComponent } from './components/students-table/students-table.component';  // Import the StudentsTableComponent
import { MatCardModule } from '@angular/material/card';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent, StudentsTableComponent],  // Include StudentsTableComponent in the declarations
      imports: [HttpClientModule, MatDialogModule,MatCardModule],
      providers: [StudentService],  // Provide your services here
    });
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear StudentsComponent', () => {
    expect(component).toBeTruthy();
  });
});
