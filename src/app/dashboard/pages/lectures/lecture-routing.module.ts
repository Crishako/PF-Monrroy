import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturesComponent } from './lectures.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LecturesComponent,
            },
            {
                path: ':id',
                component: LecturesComponent,
            },
        ]),
    ],
    exports: [RouterModule]
})
export class LectureRoutingModule { }
