import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lecture } from 'src/app/dashboard/models/lecture';

@Component({
  selector: 'app-lectures-table',
  templateUrl: './lectures-table.component.html',
  styleUrls: ['./lectures-table.component.scss']
})
export class LecturesTableComponent {
  @Input()
  dataSource: Lecture[] = [];

  @Output()
  editLecture = new EventEmitter();

  @Output()
  deleteLecture = new EventEmitter();

  displayedColumns = ['id', 'name', 'profesor', 'horario', 'actions'];
}
