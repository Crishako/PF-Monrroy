import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {
  nombreControl = new FormControl();
  fechainicioControl = new FormControl();
  fechafinControl = new FormControl();
  descripcionControl = new FormControl();
  lecturesControl = new FormControl();

  courseForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechainicioControl,
    fecha_fin: this.fechafinControl,
    descripcion: this.descripcionControl,
    lectures: this.lecturesControl,
  });
constructor(
  private matDialogRef: MatDialogRef<CoursesDialogComponent>,
  private courseService: CourseService,

  // RECIBO LA DATA (Student)
  @Inject(MAT_DIALOG_DATA) public data:{course:number, tipo:string}
) {
  if (data.course) {
  
    
    this.courseService.getCourseById$(data.course).subscribe({
      next: (s) =>{
        if (s) {
          this.courseForm.patchValue(s);
        }
      }
    })
  }

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



onSubmit(): void {
  if (this.courseForm.invalid) {
    return this.courseForm.markAllAsTouched();
  } else {
    this.matDialogRef.close(this.courseForm.value);
  }
}
}
