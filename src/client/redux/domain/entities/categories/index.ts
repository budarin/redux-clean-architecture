import { toast } from 'react-toastify';

import { onAction } from '../../../middlewares/businessLogic.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';
import {
    DELETE_ENTITY,
    DeleteEntityAction,
    INTERNAL_UPDATE_ENTITIES,
    deleteEntity,
    updateEntities,
} from '../../common/actions.ts';
import { capitalizeFirstLetter } from '../../../../../common/capitalizeFirstLetter.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';
import { entityNames } from '../index.ts';
import { delay } from '../../../../../common/promises/delay.ts';

// Actions
export const DELETE_CATEGORY = 'DELETE_CATEGORY' as const;

// Action creators
export const deleteCategory = (id: Id) => ({
    type: DELETE_CATEGORY,
    payload: { id },
});
export type DeleteCategoryAction = ReturnType<typeof deleteCategory>;

export type CategoryAction = DeleteEntityAction | InternalUpdateEntitiesAction;

// регистрируем middleware для проверки check constraints попытке удаления категории
onAction(DELETE_CATEGORY, async (get, set, api, action: DeleteCategoryAction) => {
    const { id } = action.payload;
    const state = api.getState();
    const category = state.categories.byId[id];

    const hasLinkeddTodo = Object.values<Todo>(state.todos.byId).find((todo) => todo.category_id === id);

    if (hasLinkeddTodo) {
        const errorMsg = `Нельзя удалить категорию "${category.category}" так как есть задачи, входящие в эту категорию!`;

        toast.error(errorMsg, { autoClose: 3000 });
        console.error(errorMsg, category);

        return;
    }

    // сохраняем предыдущее состояние todo
    const prevCategory = { ...api.getState().categories.byId[id] };

    api.dispatch(deleteEntity(id, entityNames.category));

    // имитируем запрос на сервер
    await delay(3000);

    // имитируем обработку ошибки на сервере
    delay(1000).then(() => api.dispatch(updateEntities({ categories: [prevCategory] })));
    toast.error(`Не удалось удалить категорию "${prevCategory.category}". Категория будет восстановлена`);
});

const initialState = createEmptyState<CategoriyState>();

export default function categoriesReducer(state = initialState, action = {} as CategoryAction) {
    switch (action.type) {
        case INTERNAL_UPDATE_ENTITIES: {
            if (!action.payload.entities?.categories || Object.keys(action.payload.entities.categories).length === 0) {
                return state;
            }

            let isAddedEntities = false;

            action.payload.entities.categories.forEach((category) => {
                state.byId[category.id] = { ...category };

                if (!isAddedEntities && state.ids.indexOf(category.id) === -1) {
                    isAddedEntities = true;
                }
            });

            if (isAddedEntities) {
                // храним порядок элементов по id
                state.ids = Object.keys(state.byId).map(Number);
            }

            return state;
        }

        case DELETE_ENTITY: {
            const { id, entityName } = action.payload;

            if (entityName !== entityNames.category) {
                return state;
            }

            const idx = state.ids[id];

            if (idx === -1) {
                return state;
            }

            const newSate = createEmptyState<CategoriyState>();

            Object.keys(state.byId).forEach((key) => {
                const id = Number(key);

                if (id !== action.payload.id) {
                    newSate.byId[id] = { ...state.byId[id] };
                }
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
        }

        default:
            return state;
    }
}
