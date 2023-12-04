import { createReducer, on } from "@ngrx/store";
import { CounterActions } from "./counter.actions";

interface  CounterState{
    value:number;
}

const initialState: CounterState = {
    value: 0
}

export const reducer = createReducer(
    initialState, 
    //Cuando llegue una acción de tipo sumar crea el nuevo estado:
    on(CounterActions.sumar, (state) =>{
        return{
            ...state,
            value: state.value + 1,
        }
    }),

    on(CounterActions.restar, (state) =>{
        return{
            ...state,
            value: state.value - 1,
        }
    })
);
