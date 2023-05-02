import { INTERNAL_UPDATE_ENTITIES } from '../../common/actions.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';

export type IconAction = InternalUpdateEntitiesAction;

const initialState = createEmptyState<IconState>();

export default function iconsReducer(state = initialState, action: IconAction = {} as IconAction) {
    switch (action.type) {
        case INTERNAL_UPDATE_ENTITIES: {
            if (!action.payload.entities?.icons || Object.keys(action.payload.entities.icons).length === 0) {
                return state;
            }

            let isAddedEntities = false;

            action.payload.entities.icons.forEach((icon) => {
                state.byId[icon.id] = { ...icon };

                if (!isAddedEntities && state.ids.indexOf(icon.id) === -1) {
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
