import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { onAction } from '../../../middlewares/businessLogic.ts';
import { anyEntityInitialState } from '../../common/consts.ts';
import { getNewState } from '../../common/getNewState.ts';
import { createEmptyState } from '../../common/createEmptyState.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_CATEGORY = 'DELETE_CATEGORY' as const;

// Action creators
export const deleteCategory = (id: number) => ({
    type: DELETE_CATEGORY,
    payload: { id },
});

type DeleteCategoryAction = ReturnType<typeof deleteCategory>;

export type CategoryAction = DeleteCategoryAction | UpdateEntitiesAction;

// @ts-ignore
onAction(DELETE_CATEGORY, (get, set, api, action: DeleteCategoryAction) => {
    const state = api.getState();
    const isFound = Object.values<Todo>(state.todos.byId).find((todo) => todo.category_id === action.payload.id);

    if (isFound) {
        console.error('Нельзя удалить category если на нее ссылается хотя бы один Todo');
        return;
    }

    return api.dispatch(action);
});

export default function categories(state = anyEntityInitialState as CategoriyState, action = {} as CategoryAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.categories || Object.keys(action.payload.entities.categories).length === 0) {
                return state;
            }

            const newSate = getNewState(state);

            action.payload.entities.categories.forEach((category) => {
                newSate.byId[category.id] = { ...category };
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
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
