import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                // /students
                path: '',
                component: StudentsComponent,
            },
            {
                // /students/:id
                path: ':id',
                component: StudentsComponent,
            },
        ]),
    ],
    exports: [RouterModule]
})
export class StudentsRoutingModule { }
