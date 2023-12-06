import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/dashboard/models/student';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../../courses/services/course.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {

  lastPartOfCourses: any[] = [];
  selectedCourseIds: number[] = []; 

  nombreControl = new FormControl();
  apellidoControl = new FormControl();
  edadControl = new FormControl();
  generoControl = new FormControl();
  emailControl = new FormControl();
  cursosControl = new FormControl();

  studentForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    edad: this.edadControl,
    genero: this.generoControl,
    email: this.emailControl,
    cursos: this.cursosControl
  });

constructor(
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<StudentsDialogComponent>,
  private matDialog: MatDialog,
  private studentService: StudentService,
  private courseService: CourseService,
  private router: Router,

  // RECIBO LA DATA (Student)
  @Inject(MAT_DIALOG_DATA) public data:{student:number, tipo:string}
) {
  if (data.student) {
    this.studentService.getStudentById$(data.student).subscribe({
      next: (s) =>{
        if (s) {
          this.studentForm.patchValue(s);
        }
      }
    })
  }

  if(data.tipo === 'addcourse'){
    this.courseService.getCourses().subscribe({
      next: (c) =>{
        if (c) {
          this.lastPartOfCourses = c;
        }
      }
    })
  }

  this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.matDialog.closeAll();
  });

}

goToCourses(): void {
  this.router.navigate(['/dashboard/courses']);
}

public get isEditing(): boolean {
  return this.data.tipo === 'edit';
}

public get isDeleting(): boolean {
  return this.data.tipo === 'delete';
}

public get isAdding(): boolean {
  return this.data.tipo === 'add';
}

public get isDetails(): boolean {
  return this.data.tipo === 'details';
}

public get isInscription(): boolean {
  return this.data.tipo === 'addcourse';
}





onSubmit(): void {
  if (this.studentForm.invalid) {
    return this.studentForm.markAllAsTouched();
  } else {
    const result = {
      ...this.studentForm.value,
      cursos: this.selectedCourseIds  // Agrega la propiedad 'cursos' al objeto result
    };
    this.matDialogRef.close(result);
  }
}



}
