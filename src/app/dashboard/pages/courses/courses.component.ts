import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { CourseService } from './services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<any>;

  constructor(private coursesService: CourseService, private matDialog: MatDialog){
    this.courses$ = this.coursesService.getCourses();
  }

  onDetails(courseId:number):void{
    const tipo = 'details';
  
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { course: courseId, tipo: tipo }
      })
  }
  
  addCourse(): void {
    let tipo = 'add';
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.createCourse({
              id: Math.floor(Math.random() * 100),
              nombre: result.nombre,
              fecha_inicio: result.fecha_inicio,
              fecha_fin: result.fecha_fin,
              descripcion: result.descripcion,
              clases: [],
            }).subscribe(
              (newCourse) =>{
                this.courses$ = this.courses$.pipe(
                  take(1),
                  map((courses) =>{
                    const uniqueCourses = [...courses, newCourse].filter(
                      (course, index, self) =>
                      index === self.findIndex((c) => c.id ===course.id)
                    );
                    return uniqueCourses;
                  })
                );
              }
            );
          }
        },
      });
  }

  onDeleteCourse(courseId: number): void {
    const tipo = 'delete';
  
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { course: courseId, tipo: tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.coursesService.deleteCourse(courseId).subscribe(
              (updateCourses) => {
                this.courses$ = this.coursesService.getCourses();
              },
              (error) => {
                console.error('Error al eliminar Curso', error);
              }
            );
          }
        },
      });
  }
  

  onEditCourse(course: number): void {
    let tipo = 'edit';
  
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { course: course, tipo },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.coursesService.editCourse$(course, result).subscribe(
              (updateCourses) => {
                // Actualiza la tabla con la nueva lista de estudiantes después de la edición.
                this.courses$ = this.coursesService.getCourses();
              },
              (error) => {
                // Maneja el error si es necesario.
                console.error('Error al editar curso', error);
              }
            );
          }
        },
      });
  }

}
