import { anyEntityInitialState, getNewState } from './common/state.ts';
import { UPDATE_ENTITIES, type UpdateEntitiesAction } from './common/actions.ts';

export type Action = UpdateEntitiesAction;

export default function categories(state = anyEntityInitialState as IconState, action: Action = {} as Action) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.icons || Object.keys(action.payload.entities.icons).length === 0) {
                return state;
            }

            const newSate = getNewState(state);

            action.payload.entities.icons.forEach((icon) => {
                newSate.byId[icon.id] = { ...icon };
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
        }
    }
}
