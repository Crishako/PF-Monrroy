import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';
import { StoreModule } from '@ngrx/store';
// import { authFeature } from './store/auth.reducer';


@NgModule({
  declarations: [
    AuthComponent
  ],
  providers:[
    {
      provide: AuthService,
      useClass: AuthService,
    },
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    // StoreModule.forFeature(authFeature),
  ]
})
export class AuthModule { }
