import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            // /students
            path: '',
            component: UsersComponent,
        },
        {
            // /students/:id
            path: ':id',
            component: UsersComponent,
        },
    ]),
],
exports: [RouterModule]
})
export class UsersRoutingModule { }
