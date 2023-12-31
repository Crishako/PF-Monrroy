import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/dashboard/models/course';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {
  @Input()
  dataSource: Course[] = [];

  @Input() role: string | null | undefined;

  @Output()
  editCourse = new EventEmitter();

  @Output()
  deleteCourse = new EventEmitter();

  @Output()
  detailsCourse = new EventEmitter();

  @Output()
  addLectureCourse = new EventEmitter();
  

  displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'actions'];
}
