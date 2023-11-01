import { Component,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/dashboard/models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrls: ['./students-dialog.component.scss']
})
export class StudentsDialogComponent {

  nombreControl = new FormControl();
  apellidoControl = new FormControl();
  edadControl = new FormControl();
  generoControl = new FormControl();
  emailControl = new FormControl();

  studentForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    edad: this.edadControl,
    genero: this.generoControl,
    email: this.emailControl,
  });

constructor(
  private fb: FormBuilder,
  private matDialogRef: MatDialogRef<StudentsDialogComponent>,
  private studentService: StudentService,

  // RECIBO LA DATA (Student)
  @Inject(MAT_DIALOG_DATA) public data:{student:number, tipo:string}
) {
  if (data.student) {
    this.studentService.getStudentById$(data.student).subscribe({
      next: (s) =>{
        console.log(s);
        
        if (s) {
          this.studentForm.patchValue(s);
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
  if (this.studentForm.invalid) {
    return this.studentForm.markAllAsTouched();
  } else {
    this.matDialogRef.close(this.studentForm.value);
  }
}


}
