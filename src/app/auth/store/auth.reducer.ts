import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { AuthActions } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface State{
    authUser: User | null;
}

export const initialState: State = {
    authUser: null,
}

export const reducer = createReducer(initialState,
    on(AuthActions.setAuthUser, (state, {data}) => ({...state,authUser:data})),

    on(AuthActions.resetState, () => initialState),
);


