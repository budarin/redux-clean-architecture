import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// reducers
import todos from './domain/todos/index.ts';

function rootReducer(state = {} as State, action: any) {
    return {
        todos: todos(state.todos, action),
    };
}

// @ts-ignore
const log = (config) => (set, get, api) => {
    const initialState = config(set, get, api);
    const originalDispath = api.dispatch;
    api.dispatch = (action: any) => {
        try {
            console.log('  applying', action);
            return originalDispath(action);
        } finally {
            console.log('  new state', get());
        }
    };
    return initialState;
};

// @ts-ignore
const initialState = rootReducer(undefined, {});

// @ts-ignore
export const useStore = create<State>(log(redux(rootReducer, initialState)));
