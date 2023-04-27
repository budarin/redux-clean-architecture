import { create } from 'zustand';
import { redux } from 'zustand/middleware';

import './domain/check_constraints/index.ts';

// store initial state
import { entitiesInitialState } from './domain/common/state.ts';

// actions
import { RESET_STATE } from './domain/common/actions.ts';

// middlewares
import { logger } from './middlewares/logger.ts';
import { businessLogic } from './middlewares/businessLogic.ts';

// reducers
import icons from './domain/entities/icons/icons.ts';
import todos from './domain/entities/todos/index.ts';
import statuses from './domain/entities/statuses/statuses.ts';
import categories from './domain/entities/categories/index.ts';

function rootReducer(state: EntitiesState | undefined, action: any = {}) {
    if (typeof action !== 'object') {
        return state;
    }

    if (action.type === RESET_STATE) {
        return entitiesInitialState;
    }

    return {
        icons: icons(state?.icons, action),
        statuses: statuses(state?.statuses, action),
        categories: categories(state?.categories, action),
        todos: todos(state?.todos, action),
    };
}

const coreStore = businessLogic(redux(rootReducer, entitiesInitialState));
const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<State>(store);
