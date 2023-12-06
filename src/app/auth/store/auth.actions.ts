import { createActionGroup, props } from '@ngrx/store';
import { User } from '../models/user';


export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth User': props<{data: User}>(),
        'Reset state' : props<{data:User}>()
    }
})