// user.reducer.ts

import { createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from 'src/app/auth/models/user';

export const userFeatureKey = 'user';

export interface UserState {
  users: User[];
  isLoading: boolean;
}

export const initialState: UserState = {
  users: [],
  isLoading: false,
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    users: data
  })),
  on(UserActions.addUserSuccess, (state, { user }) => {
    return { ...state, users: [...state.users, user] };
  }),
  on(UserActions.deleteUserSuccess, (state, { userId }) => {
    return { ...state, users: state.users.filter(user => user.id !== userId) };
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map(u => (u.id === user.id ? user : u));
    return { ...state, users: updatedUsers };
  })
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer
});
