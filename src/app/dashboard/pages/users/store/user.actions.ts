// user.actions.ts

import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/auth/models/user';

export const loadUsers = createAction(' Load Users');
export const loadUsersSuccess = createAction('Load Users Success', props<{ data: User[] }>());
export const loadUsersFailure = createAction('Load User Failure', props<{error: unknown}>());
export const addUser = createAction('Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: User }>());

export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ userId: number }>());

export const updateUser = createAction('[User] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());
