import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '', // /dashboard,
      component: DashboardComponent,
      children:[
        {
          path: 'home', // /dashboard/home
          component: HomeComponent,
        },
        {
          path: 'students',
          loadChildren: () =>
            import('./pages/students/students.module').then(
              (m) => m.StudentsModule
            ),
        },
        {
          path: '**',
          redirectTo: 'home',
        },
      ],
    },
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
