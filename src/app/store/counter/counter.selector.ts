import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState, counterFeatureName } from "./counter.reducer";


export const selectCounterState = createFeatureSelector<CounterState>(counterFeatureName);

export const selectCounterValue = createSelector(
    selectCounterState,
    (state) => state.value
);

export const selectByC = createSelector(
    selectCounterState,
    ({b,c}) => ({ b, c  })
);