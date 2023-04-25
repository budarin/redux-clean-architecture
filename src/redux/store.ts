import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// middlewares
import { logger } from './middlewares/logger.ts';
import { businessLogic } from './middlewares/businessLogic.ts';

// reducers
import todos from './domain/todos/index.ts';

function rootReducer(state = {} as State, action: any) {
    return {
        todos: todos(state.todos, action),
    };
}

const initialState = rootReducer(undefined, {});

// @ts-ignore
export const useStore = create<State>(logger(businessLogic(redux(rootReducer, initialState))));
