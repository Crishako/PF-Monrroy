import { Component } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { StudentService } from './services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent  {

  public authUser$: Observable<User | null>;
  students$: Observable<any>;
  role$: Observable<string | undefined>;

  constructor(private studentService: StudentService, private matDialog: MatDialog, private authService: AuthService){
    this.students$ = this.studentService.getStudents();
    this.authUser$ = this.authService.authUser$;
    this.role$ = this.authUser$.pipe(map((user) => user?.role));
    
  }

 

  onDetails(studentId:number):void{
    const tipo = 'details';
  
    this.matDialog
      .open(StudentsDialogComponent, {
        data: { student: studentId, tipo: tipo }
      })
  }

  addStudent(): void {
    let tipo = 'add';
    this.matDialog
      .open(StudentsDialogComponent, {
        data: { tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.studentService.createStudent({
              id: Math.floor(Math.random() * 100),
              nombre: result.nombre,
              apellido: result.apellido,
              edad: result.edad,
              genero: result.genero,
              email: result.email,
              cursos: []
            }).subscribe(
              (newStudent) => {
                this.students$ = this.students$.pipe(
                  take(1),
                  map((students) => {
                    const uniqueStudents = [...students, newStudent].filter(
                      (student, index, self) =>
                        index === self.findIndex((s) => s.id === student.id)
                    );
                    return uniqueStudents;
                  })
                );
              }
            );
          }
        },
      });
  }

  onAddCourseStudent(studentId: number): void {
    let tipo = 'addcourse';
    this.matDialog
      .open(StudentsDialogComponent, {
        data: { tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          
          if (result && result.cursos && result.cursos.length > 0) {
            const cursosSeleccionados = result.cursos.map((cursoId: any) => Number(cursoId));
            this.studentService.addCoursesToStudent(studentId, cursosSeleccionados).subscribe(
              (updatedStudent) => {
                this.students$ = this.studentService.getStudents();
              },
              (error) => {
                console.error('Error al agregar cursos al estudiante', error);
              }
            );
          }
        },
      });
  }
  
  

  onDeleteStudent(studentId: number): void {
    const tipo = 'delete';
  
    this.matDialog
      .open(StudentsDialogComponent, {
        data: { student: studentId, tipo: tipo }
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.studentService.deleteStudent(studentId).subscribe(
              (updatedStudents) => {
                this.students$ = this.studentService.getStudents();
              },
              (error) => {
                console.error('Error al eliminar estudiante', error);
              }
            );
          }
        },
      });
  }

  onEditStudent(studentId: number): void {
    let tipo = 'edit';
  
    this.matDialog
      .open(StudentsDialogComponent, {
        data: { student: studentId, tipo },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.studentService.editStudent$(studentId, result).subscribe(
              (updatedStudents) => {
                // Actualiza la tabla con la nueva lista de estudiantes después de la edición.
                this.students$ = this.studentService.getStudents();
              },
              (error) => {
                console.error('Error al editar estudiante', error);
              }
            );
          }
        },
      });
  }
  

}
