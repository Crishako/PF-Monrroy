import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LectureService } from '../../services/lecture.service';

@Component({
  selector: 'app-lectures-dialog',
  templateUrl: './lectures-dialog.component.html',
  styleUrls: ['./lectures-dialog.component.scss']
})
export class LecturesDialogComponent {
  nombreControl = new FormControl();
  profesorControl = new FormControl();
  horarioControl = new FormControl();
  descripcionControl = new FormControl();

  lectureForm = new FormGroup({
    nombre: this.nombreControl,
    profesor: this.profesorControl,
    horario: this.horarioControl,
    descripcion: this.descripcionControl
  });
constructor(
  private matDialogRef: MatDialogRef<LecturesDialogComponent>,
  private lectureService: LectureService,

  // RECIBO LA DATA (Student)
  @Inject(MAT_DIALOG_DATA) public data:{lecture:number, tipo:string}
) {
  if (data.lecture) {
  
    
    this.lectureService.getLectureById$(data.lecture).subscribe({
      next: (s) =>{
        console.log(s);
        
        if (s) {
          this.lectureForm.patchValue(s);
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




onSubmit(): void {
  if (this.lectureForm.invalid) {
    return this.lectureForm.markAllAsTouched();
  } else {
    this.matDialogRef.close(this.lectureForm.value);
  }
}
}
