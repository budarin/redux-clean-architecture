import { getNewState } from '../../common/getNewState.ts';
import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { getAnyEntityInitialState } from '../../common/getAnyEntityInitialState.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

export type IconAction = UpdateEntitiesAction;

const initialState = getAnyEntityInitialState() as IconState;

export default function categories(state = initialState, action: IconAction = {} as IconAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.icons || Object.keys(action.payload.entities.icons).length === 0) {
                return state;
            }

            action.payload.entities.icons.forEach((icon) => {
                state.byId[icon.id] = { ...icon };
            });

            // храним порядок элементов по id
            state.ids = Object.keys(state.byId).map(Number);

            return state;
        }

        default:
            return state;
    }
}
