import { ActionReducerMap } from '@ngrx/store';
import { authFeatureKey, reducer as authReducer, State as AuthState} from './auth.reducer';

export interface AppState {
    [authFeatureKey]: AuthState
}

export const appReducer: ActionReducerMap<any> = {
    [authFeatureKey]:authReducer
}