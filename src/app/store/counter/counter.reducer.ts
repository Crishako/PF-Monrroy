import { createReducer, on } from "@ngrx/store";
import { CounterActions } from "./counter.actions";

export const counterFeatureName = 'counter';

export interface  CounterState{
    value:number;
    a: string;
    b: string;
    c: string;
}

const initialState: CounterState = {
    value: 0,
    a: 'a',
    b: 'b',
    c: 'c',
}

export const reducer = createReducer(
    initialState, 
    //Cuando llegue una acción de tipo sumar crea el nuevo estado:
    on(CounterActions.sumar, (state ,{cantidad}) =>{
        return{
            ...state,
            value: state.value + cantidad,
        }
    }),

    on(CounterActions.restar, (state, {cantidad}) =>{
        return{
            ...state,
            value: state.value - cantidad,
        }
    })
);
