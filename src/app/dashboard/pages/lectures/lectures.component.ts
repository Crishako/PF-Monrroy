import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LectureService } from './services/lecture.service';
import { MatDialog } from '@angular/material/dialog';
import { LecturesDialogComponent } from './components/lectures-dialog/lectures-dialog.component';
import { Lecture } from '../../models/lecture';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent {

  lectures$: Observable<any>;

  constructor(private lectureService: LectureService, private matDialog: MatDialog){
    
    
    this.lectures$ = this.lectureService.getLectures();
    this.lectures$.subscribe(data => console.log(data)); // Agregar este console.log
    console.log(this.lectures$);
  }

  
  addLecture(): void {
    let tipo =  'add';
    this.matDialog
      .open(LecturesDialogComponent,{
        data:{tipo}
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.lectures$ = this.lectureService.createLecture({
              id:  Math.floor(Math.random() * 100),
              nombre: result.nombre,
              profesor: result.fecha_inicio,
              horario: result.fecha_fin,
              descripcion: result.descripcion,
              calificaciones: {
                certamen1: Math.floor(Math.random() * 100),
                certamen2: Math.floor(Math.random() * 100),
                certamen3: Math.floor(Math.random() * 100),
                examen: Math.floor(Math.random() * 100),
              }
            });
          }
        },
      });
  }

  onDeleteLecture(lectureId: number): void {
    const tipo = 'delete';
  
    this.matDialog
      .open(LecturesDialogComponent, {
        data: { lecture: lectureId, tipo: tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            // Realiza la lógica de eliminación aquí si es necesario
            this.lectures$ = this.lectureService.deleteLecture(lectureId);
            console.log('Clase eliminada:', result);
          }
        },
      });
  }
  

  onEditLecture(lecture: number): void {
    let tipo =  'edit';
    
    this.matDialog
      .open(LecturesDialogComponent, {
        data: {lecture, tipo},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.lectures$ = this.lectureService.editLecture$(lecture, result);
          }
        },
      });
  }

}
