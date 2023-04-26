import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// store initial state
import { storeInitialState } from './domain/common/state.ts';

// actions
import { RESET_STATE } from './domain/common/actions.ts';

// middlewares
import { logger } from './middlewares/logger.ts';
import { businessLogic } from './middlewares/businessLogic.ts';

// reducers
import icons from './domain/icons.ts';
import todos from './domain/todos/index.ts';
import statuses from './domain/statuses.ts';
import categories from './domain/categories/index.ts';

function rootReducer(state: State | undefined, action: any) {
    if (action.type === RESET_STATE) {
        return storeInitialState;
    }

    return {
        icons: icons(state?.icons, action),
        statuses: statuses(state?.statuses, action),
        categories: categories(state?.categories, action),
        todos: todos(state?.todos, action),
    };
}

const coreStore = businessLogic(redux(rootReducer, storeInitialState));

const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<StateEithDispatch>(store);
