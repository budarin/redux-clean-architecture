import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// регистрируем middleware который обрабатывает UPDATE_TO action
// с целью проверки целостности обновляемых в store данных
import './domain/middlewares/checkConstraintsOnUpdate/index.ts';

// actions
import { RESET_STATE } from './domain/common/actions.ts';

// middlewares
import { logger } from './middlewares/logger.ts';
import { businessLogic } from './middlewares/businessLogic.ts';

// reducers
import icons from './domain/entities/icons/icons.ts';
import todos, { UPDATE_TODO } from './domain/entities/todos/index.ts';
import statuses from './domain/entities/statuses/statuses.ts';
import categories from './domain/entities/categories/index.ts';
import navigationFilter from './domain/entities/navigationFilter/index.ts';
import { initialState } from '../../server/initialSate.ts';

function rootReducer(
    state: EntitiesState | undefined,
    action: any = {},
):
    | {
          icons: IconState;
          statuses: StatusState;
          categories: CategoriyState;
          todos: TodoState;
          navigationFilter: NavigationFilterState;
      }
    | undefined {
    if (typeof action !== 'object') {
        return state;
    }

    if (action.type === RESET_STATE) {
        return entityInitialState;
    }

    return {
        icons: icons(state?.icons, action),
        statuses: statuses(state?.statuses, action),
        categories: categories(state?.categories, action),
        todos: todos(state?.todos, action),
        navigationFilter: navigationFilter(state?.navigationFilter, action),
    };
}

const entityInitialState = rootReducer(undefined, {});

const coreStore = businessLogic(redux(rootReducer, entityInitialState));
const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<State>(store);

// setup store with data from server
useStore.getState().dispatch({
    type: UPDATE_TODO,
    payload: {
        entities: initialState,
    },
});
