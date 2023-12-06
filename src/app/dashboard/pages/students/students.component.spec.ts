import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './students.component';
import { StudentService } from './services/student.service'; 
import { MatDialogModule } from '@angular/material/dialog';
import { StudentsTableComponent } from './components/students-table/students-table.component';  
import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store'; 

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent, StudentsTableComponent],
      imports: [
        HttpClientModule,
        MatDialogModule,
        MatCardModule,
        StoreModule.forRoot({}) 
      ],
      providers: [StudentService],
    });
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crear StudentsComponent', () => {
    expect(component).toBeTruthy();
  });
});
