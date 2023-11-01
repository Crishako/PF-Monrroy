import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturesComponent } from './lectures.component';
import { LectureRoutingModule } from './lecture-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LecturesComponent
  ],
  imports: [
    CommonModule,
    LectureRoutingModule,
    SharedModule,
  ],
  exports:[LecturesComponent]
})
export class LecturesModule { }
