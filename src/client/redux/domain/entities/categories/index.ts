import { toast } from 'react-toastify';

import { onAction } from '../../../middlewares/businessLogic.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';
import { INTERNAL_UPDATE_ENTITIES } from '../../common/actions.ts';
import { capitalizeFirstLetter } from '../../../../../common/capitalizeFirstLetter.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_CATEGORY = 'DELETE_CATEGORY' as const;

// Action creators
export const deleteCategory = (id: Id, category: CategoryName) => ({
    type: DELETE_CATEGORY,
    payload: { id, category },
});
export type DeleteCategoryAction = ReturnType<typeof deleteCategory>;

export type CategoryAction = DeleteCategoryAction | InternalUpdateEntitiesAction;

// @ts-ignore
// регистрируем middleware для проверки check constraints попытке удаления категории
onAction(DELETE_CATEGORY, (get, set, api, action: DeleteCategoryAction) => {
    const state = api.getState();
    const linkeddTodo = Object.values<Todo>(state.todos.byId).find((todo) => todo.category_id === action.payload.id);

    if (linkeddTodo) {
        const errorMsg = `Нельзя удалить категорию "${action.payload.category}" так как есть задачи, входящие в эту категорию!`;

        toast.error(errorMsg);
        console.error(errorMsg, state.categories.byId[action.payload.id]);

        return;
    }

    return api.dispatch(action);
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
                state.byId[category.id] = {
                    id: category.id,
                    icon_id: category.icon_id,
                    category: capitalizeFirstLetter(category.category),
                };

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

        case DELETE_CATEGORY: {
            if (state.ids.length === 0) {
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
