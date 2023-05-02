import { INTERNAL_UPDATE_ENTITIES } from '../../common/actions.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';

export type StatusAction = InternalUpdateEntitiesAction;

const initialState = createEmptyState<StatusState>();

export default function statusesReducer(state = initialState, action: StatusAction = {} as StatusAction) {
    switch (action.type) {
        case INTERNAL_UPDATE_ENTITIES: {
            if (!action.payload.entities?.statuses || Object.keys(action.payload.entities.statuses).length === 0) {
                return state;
            }

            let isAddedEntities = false;

            action.payload.entities.statuses.forEach((status) => {
                state.byId[status.id] = { ...status };

                if (!isAddedEntities && state.ids.indexOf(status.id) === -1) {
                    isAddedEntities = true;
                }
            });

            if (isAddedEntities) {
                // храним порядок элементов по id
                state.ids = Object.keys(state.byId).map(Number);
            }

            return state;
        }

        default:
            return state;
    }
}
