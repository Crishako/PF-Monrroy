import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentService } from './services/student.service';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ],
  providers:[
    {
      // Cuando se inyecte UsersService,
      provide: StudentService,
      // Enrealidad uses:
      useClass: StudentService,
    },
  ],
  exports:[StudentsComponent]
  
})
export class StudentsModule { }
