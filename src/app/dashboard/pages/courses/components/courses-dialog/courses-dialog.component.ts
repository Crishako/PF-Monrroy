import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { LectureService } from '../../../lectures/services/lecture.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss']
})
export class CoursesDialogComponent {

  lastPartOfLectures: any[] = [];
  selectedLectureIds: number[] = []; 

  nombreControl = new FormControl();
  fechainicioControl = new FormControl();
  fechafinControl = new FormControl();
  descripcionControl = new FormControl();
  clasesControl = new FormControl();

  courseForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechainicioControl,
    fecha_fin: this.fechafinControl,
    descripcion: this.descripcionControl,
    clases: this.clasesControl,
  });
constructor(
  private matDialogRef: MatDialogRef<CoursesDialogComponent>,
  private courseService: CourseService,
  private lectureService: LectureService,

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

  if(data.tipo === 'addlecture'){
    this.lectureService.getLectures().subscribe({
      next: (l) =>{
        if (l) {
          this.lastPartOfLectures = l;
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

public get isInscription(): boolean {
  return this.data.tipo === 'addlecture';
}


onSubmit(): void {
  if (this.courseForm.invalid) {
    return this.courseForm.markAllAsTouched();
  } else {
    const result = {
      ...this.courseForm.value,
      clases: this.selectedLectureIds  // Agrega la propiedad 'cursos' al objeto result
    };
    this.matDialogRef.close(result);
  }
}
}
