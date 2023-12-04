import { ActionReducerMap } from "@ngrx/store";
import { reducer as CounterReducer } from "./counter/counter.reducer";

export const appReducer: ActionReducerMap<any> = {
    counter: CounterReducer 
};
