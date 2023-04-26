import { anyEntityInitialState, getNewState } from '../common/state.ts';
import { UPDATE_ENTITIES, type UpdateEntitiesAction } from '../common/actions.ts';

export type Action = UpdateEntitiesAction;

export default function categories(state = anyEntityInitialState as CategoriyState, action: Action = {} as Action) {
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
    }
}
