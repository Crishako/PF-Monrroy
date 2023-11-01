import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LecturesTableComponent } from './components/lectures-table/lectures-table.component';
import { LecturesDialogComponent } from './components/lectures-dialog/lectures-dialog.component';
import { LectureService } from './services/lecture.service';



@NgModule({
  declarations: [
    LecturesComponent,
    LecturesTableComponent,
    LecturesDialogComponent
  ],
  providers:[
    {
      provide: LectureService,
      useClass: LectureService,
    },
  ],
  imports: [
    CommonModule,
    LectureRoutingModule,
    SharedModule,
  ],
  exports:[LecturesComponent]
})
export class LecturesModule { }
