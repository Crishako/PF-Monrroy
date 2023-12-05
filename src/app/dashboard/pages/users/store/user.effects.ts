// user.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class UserEffects {

  

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      concatMap(() =>
        this.userService.getUsers().pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({error})))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserActions.addUser),
    mergeMap(action =>
      this.userService.createUser(action.user).pipe(
        map(user => UserActions.addUserSuccess({ user })),
        catchError(error => of(/* Handle error if needed */))
      )
    ),
    tap(() => {
      // Cierra el MatDialog después de completar la acción addUser
      this.matDialog.closeAll();
    })
  )
);

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => UserActions.deleteUserSuccess({ userId: action.userId })),
          catchError(error => of(/* Handle error if needed */))
        )
      ),
      tap(() => {
        // Cierra el MatDialog después de completar la acción addUser
        this.matDialog.closeAll();
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(action =>
        this.userService.editUser$(action.user.id, action.user).pipe(
          map(updatedUser => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError(error => of(/* Handle error if needed */))
        )
      ),
      tap(() => {
        // Cierra el MatDialog después de completar la acción addUser
        this.matDialog.closeAll();
      })
    )
  );

  constructor(private actions$: Actions, private userService: UserService, private matDialog: MatDialog) {}
}
