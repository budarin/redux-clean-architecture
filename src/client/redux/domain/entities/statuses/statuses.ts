import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { getNewState } from '../../common/getNewState.ts';
import { getAnyEntityInitialState } from '../../common/getAnyEntityInitialState.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

export type StatusAction = UpdateEntitiesAction;

export default function categories(
    state = getAnyEntityInitialState as StatusState,
    action: StatusAction = {} as StatusAction,
) {
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
