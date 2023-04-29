import { create } from 'zustand';
import { redux } from 'zustand/middleware';

import './domain/check_constraints/index.ts';

// store initial state
import { getEntitiesInitialState } from './domain/common/getEntitiesInitialState.ts';

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

import { initialState as serverInitialState } from '../../server/initialSate.ts';
import { normalizeEntitiesPayload } from './domain/common/normalizeEntitiesPayload.ts';

function rootReducer(state: EntitiesState | undefined, action: any = {}) {
    if (typeof action !== 'object') {
        return state;
    }

    if (action.type === RESET_STATE) {
        return getEntitiesInitialState();
    }

    return {
        icons: icons(state?.icons, action),
        statuses: statuses(state?.statuses, action),
        categories: categories(state?.categories, action),
        todos: todos(state?.todos, action),
    };
}

const initialState = normalizeEntitiesPayload(serverInitialState) as State;
const coreStore = businessLogic(redux(rootReducer, initialState));
const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<State>(store);
