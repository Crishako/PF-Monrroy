import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from 'src/app/dashboard/models/student';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent {

  @Input()
  dataSource: Student[] = [];

  @Output()
  editCourse = new EventEmitter();

  @Output()
  detailsStudent = new EventEmitter();


  @Output()
  deleteCourse = new EventEmitter();

  displayedColumns = ['id', 'name', 'email' ,'actions'];
}
