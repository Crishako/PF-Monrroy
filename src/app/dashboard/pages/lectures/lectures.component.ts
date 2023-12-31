import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { LectureService } from './services/lecture.service';
import { MatDialog } from '@angular/material/dialog';
import { LecturesDialogComponent } from './components/lectures-dialog/lectures-dialog.component';
import { Lecture } from '../../models/lecture';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.scss']
})
export class LecturesComponent {

  lectures$: Observable<any>;
  public authUser$: Observable<User | null>;
  role$: Observable<string | undefined>;

  constructor(private lectureService: LectureService, private matDialog: MatDialog,  private authService: AuthService){
    this.lectures$ = this.lectureService.getLectures();
    this.authUser$ = this.authService.authUser$;
    this.role$ = this.authUser$.pipe(map((user) => user?.role));
  }

  onDetails(lectureId:number):void{
    const tipo = 'details';
  
    this.matDialog
      .open(LecturesDialogComponent, {
        data: { lecture: lectureId, tipo: tipo }
      })
  }
  
  addLecture(): void {
    let tipo = 'add';
    this.matDialog
      .open(LecturesDialogComponent, {
        data: { tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.lectureService.createLecture({
              id: Math.floor(Math.random() * 100),
              nombre: result.nombre,
              profesor: result.profesor,
              horario: result.horario,
              descripcion: result.descripcion,
              calificaciones: {
                certamen1: 0,
                certamen2: 0,
                certamen3: 0,
                examen: 0,
              },
            }).subscribe(
              (newLecture) =>{
                this.lectures$ = this.lectures$.pipe(
                  take(1),
                  map((lectures) =>{
                    const uniqueLectures = [...lectures, newLecture].filter(
                      (lecture, index, self) =>
                      index === self.findIndex((l) => l.id ===lecture.id)
                    );
                    return uniqueLectures;
                  })
                );
              }
            );
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
            this.lectureService.deleteLecture(lectureId).subscribe(
              (updateLectures) => {
                this.lectures$ = this.lectureService.getLectures();
              },
              (error) => {
              }
            );
          }
        },
      });
  }
  


  onEditLecture(lecture: number): void {
    let tipo = 'edit';
  
    this.matDialog
      .open(LecturesDialogComponent, {
        data: { lecture, tipo },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.lectureService.editLecture$(lecture, result).subscribe(
              (updateLectures) => {
                // Actualiza la tabla con la nueva lista de estudiantes después de la edición.
                this.lectures$ = this.lectureService.getLectures();
              },
              (error) => {
                console.error('Error al editar clase', error);
              }
            );
          }
        },
      });
  }
}
