import { create } from 'zustand';
import { redux } from 'zustand/middleware';

// middlewares
import { logger } from './middlewares/logger.ts';
import { businessLogic } from './middlewares/businessLogic.ts';

// reducers
import todos from './domain/todos/index.ts';
import categories from './domain/categories/index.ts';
import statuses from './domain/statuses.ts';
import icons from './domain/icons.ts';

// порядок редьюсеров очень важен при обновлении всех сущностей
// с action UPDATE_ENTITIES - делаем вставку в сущности по мереи их
// зависимостей друг от друга чтобы при проверках не нарушалась
// ссылочная целостность данных
function rootReducer(state: State | undefined, action: any) {
    return {
        icons: icons(state?.icons, action),
        statuses: statuses(state?.statuses, action),
        categories: categories(state?.categories, action),
        todos: todos(state?.todos, action),
    };
}

export const initialState = rootReducer(undefined, {});

const coreStore = businessLogic(redux(rootReducer, initialState));
const store = process.env['NODE_ENV'] === 'production' ? coreStore : logger(coreStore);

export const useStore = create<StateEithDispatch>(store);
