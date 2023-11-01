import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CoursesComponent,
            },
            {
                path: ':id',
                component: CoursesComponent,
            },
        ]),
    ],
    exports: [RouterModule]
})
export class CoursesRoutingModule { }
