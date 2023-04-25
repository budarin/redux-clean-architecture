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

export const initialState = rootReducer(undefined, {});

// @ts-ignore
const coreStore = businessLogic(redux(rootReducer, initialState));
const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<State>(store);
