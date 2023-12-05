import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userFeature } from './store/user.reducer';
import { UserEffects } from './store/user.effects';


@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
  exports:[
    UsersComponent,
  ]
})
export class UsersModule { }
