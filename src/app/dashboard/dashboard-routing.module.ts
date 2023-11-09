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
          loadChildren: () =>
            import('./pages/home/home.module').then(
              (m) => m.HomeModule
            ),
        },
        {
          path: 'students',
          loadChildren: () =>
            import('./pages/students/students.module').then(
              (m) => m.StudentsModule
            ),
        },
        {
          path: 'courses',
          loadChildren: () =>
            import('./pages/courses/courses.module').then(
              (m) => m.CoursesModule
            ),
        },
        {
          path: 'lectures',
          loadChildren: () =>
            import('./pages/lectures/lectures.module').then(
              (m) => m.LecturesModule
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
