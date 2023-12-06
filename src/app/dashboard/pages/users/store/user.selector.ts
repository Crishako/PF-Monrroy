// user.selectors.ts
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(fromUser.userFeatureKey);


export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users // Asegurarse de que state no sea undefined
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);
