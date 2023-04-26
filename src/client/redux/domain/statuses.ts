import { anyEntityInitialState, getNewState } from './common/state.ts';
import { UPDATE_ENTITIES, type UpdateEntitiesAction } from './common/actions.ts';

export type Action = UpdateEntitiesAction;

export default function categories(state = anyEntityInitialState as StatusState, action: Action = {} as Action) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.statuses || Object.keys(action.payload.entities.statuses).length === 0) {
                return state;
            }

            const newSate = getNewState(state);

            action.payload.entities.statuses.forEach((status) => {
                newSate.byId[status.id] = { ...status };
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
        }
    }
}
