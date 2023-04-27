import { anyEntityInitialState, createEmptyState, getNewState } from '../common/state.ts';
import { UPDATE_ENTITIES, type UpdateEntitiesAction } from '../common/actions.ts';

// Actions
export const DELETE_CATEGORY = 'DELETE_CATEGORY' as const;

// Action creators
export const deleteCategory = (id: number) => ({
    type: DELETE_CATEGORY,
    payload: id,
});

type DeleteCategoryAction = ReturnType<typeof deleteCategory>;

export type CategoryAction = DeleteCategoryAction | UpdateEntitiesAction;

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

                if (id !== action.payload) {
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
