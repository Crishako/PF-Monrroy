import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CourseService } from './services/course.service';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CoursesDialogComponent
  ],
  providers:[
    {
      provide: CourseService,
      useClass: CourseService,
    },
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
