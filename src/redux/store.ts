import { create } from 'zustand';
import { redux } from 'zustand/middleware';
import { combineReducers } from 'redux';

// reducers
import todos from './domain/todos/index';

const rootReducer = combineReducers({
    todos,
});

//@ts-ignore
const log = (config) => (set, get, api) =>
    config(
        (...args: any) => {
            console.log('  applying', args);
            set(...args);
            console.log('  new state', get());
        },
        get,
        api,
    );

export const useStore = create<State>(log(redux(rootReducer, {} as State)));
