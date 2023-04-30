import { UPDATE_ENTITIES } from '../../common/actions.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';

export type StatusAction = UpdateEntitiesAction;

const initialState = createEmptyState<StatusState>();

export default function categories(state = initialState, action: StatusAction = {} as StatusAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.statuses || Object.keys(action.payload.entities.statuses).length === 0) {
                return state;
            }

            action.payload.entities.statuses.forEach((status) => {
                state.byId[status.id] = { ...status };
            });

            // храним порядок элементов по id
            state.ids = Object.keys(state.byId).map(Number);

            return state;
        }

        default:
            return state;
    }
}
