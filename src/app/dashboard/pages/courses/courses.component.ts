import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from './services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

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

  
  addCourse(): void {
    let tipo =  'add';
    this.matDialog
      .open(CoursesDialogComponent,{
        data:{tipo}
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.courses$ = this.coursesService.createCourse({
              id:  Math.floor(Math.random() * 100),
              nombre: result.nombre,
              fecha_inicio: result.fecha_inicio,
              fecha_fin: result.fecha_fin,
              descripcion: result.descripcion,
              clases: []
            });
          }
        },
      });
  }

  onDeleteCourse(courseId: number): void {
    const tipo = 'delete';
  
    this.matDialog
      .open(CoursesDialogComponent, {
        data: { student: courseId, tipo: tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            // Realiza la lógica de eliminación aquí si es necesario
            this.courses$ = this.coursesService.deleteCourse(courseId);
            console.log('Curso eliminado:', result);
          }
        },
      });
  }
  

  onEditCourse(course: number): void {
    let tipo =  'edit';
    
    this.matDialog
      .open(CoursesDialogComponent, {
        data: {course, tipo},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.courses$ = this.coursesService.editCourse$(course, result);
          }
        },
      });
  }

}
