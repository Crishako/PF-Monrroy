import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const CounterActions = createActionGroup({
    source: 'Counter',
    events: {
        // Sumar: emptyProps(),
        Sumar: props<{cantidad: number}>(),
        Restar: props<{cantidad: number}>()
    }
});