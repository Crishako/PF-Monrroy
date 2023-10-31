import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  students$: Observable<any>;

  constructor(private studentService: StudentService){
    this.students$ = this.studentService.getStudents();
  }
}
