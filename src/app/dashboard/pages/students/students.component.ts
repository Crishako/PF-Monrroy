import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from './services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

  students$: Observable<any>;

  constructor(private studentService: StudentService, private matDialog: MatDialog){
    this.students$ = this.studentService.getStudents();
  }

  addStudent(): void {
    let tipo =  'add';
    this.matDialog
      .open(StudentsDialogComponent,{
        data:{tipo}
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.students$ = this.studentService.createStudent({
              id:  Math.floor(Math.random() * 100),
              nombre: result.nombre,
              apellido: result.apellido,
              edad: result.edad,
              genero: result.genero,
              email: result.email,
              cursos: []
            });
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
            // Realiza la lógica de eliminación aquí si es necesario
            this.students$ = this.studentService.deleteStudent(studentId);
            console.log('Estudiante eliminado:', result);
          }
        },
      });
  }
  

  onEditStudent(student: number): void {
    let tipo =  'edit';
    console.log('student',student);
    
    this.matDialog
      .open(StudentsDialogComponent, {
        data: {student, tipo},
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.students$ = this.studentService.editStudent$(student, result);
          }
        },
      });
  }

}
