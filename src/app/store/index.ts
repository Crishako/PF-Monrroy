import { ActionReducerMap } from "@ngrx/store";
import { reducer as counterReducer, counterFeatureName } from './counter/counter.reducer';

export const appReducer: ActionReducerMap<any> = {
    [counterFeatureName]: counterReducer 
};
