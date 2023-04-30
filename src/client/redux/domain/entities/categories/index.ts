import { getNewState } from '../../common/getNewState.ts';
import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { getAnyEntityInitialState } from '../../common/getAnyEntityInitialState.ts';
import { onAction } from '../../../middlewares/businessLogic.ts';
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
    const linkeddTodo = Object.values<Todo>(state.todos.byId).find((todo) => todo.category_id === action.payload.id);

    if (linkeddTodo) {
        console.error(
            'Categories: нельзя удалить category если на нее ссылается хотя бы один Todo',
            state.categories.byId[action.payload.id],
        );
        return;
    }

    return api.dispatch(action);
});

const initialState = getAnyEntityInitialState() as CategoriyState;

export default function categories(state = initialState, action = {} as CategoryAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.categories || Object.keys(action.payload.entities.categories).length === 0) {
                return state;
            }

            action.payload.entities.categories.forEach((category) => {
                state.byId[category.id] = { ...category };
            });

            // храним порядок элементов по id
            state.ids = Object.keys(state.byId).map(Number);

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
