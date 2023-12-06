import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { CourseService } from './services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Course } from '../../models/course';
import { User } from 'src/app/auth/models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses$: Observable<any>;
  public authUser$: Observable<User | null>;
  role$: Observable<string | undefined>;


  constructor(private coursesService: CourseService, private matDialog: MatDialog, private authService: AuthService){
    this.courses$ = this.coursesService.getCourses();
    this.authUser$ = this.authService.authUser$;
    this.role$ = this.authUser$.pipe(map((user) => user?.role));
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

  onAddLectureCourse(courseId: number): void {
    let tipo = 'addlecture';
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result && result.clases && result.clases.length > 0) {
            const clasesSeleccionadas = result.clases.map((lectureId: any) => Number(lectureId));
            console.log(clasesSeleccionadas);
            
            this.coursesService.addLectureToCourse(courseId, clasesSeleccionadas).subscribe(
              (updatedCourse) => {
                this.courses$ = this.coursesService.getCourses();
              },
              (error) => {
                console.error('Error al agregar clases al curso', error);
              }
            );
          }
        },
      });
  }

}
