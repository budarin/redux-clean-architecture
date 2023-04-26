import { entityInitialState } from '../common/state.ts';
import { UPDATE_ENTITIES, type UpdateEntitiesAction } from '../common/actions.ts';

export type Action = UpdateEntitiesAction;

export default function categories(state = entityInitialState as CategoryState, action: Action = {} as Action) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            return state;
        }
    }
}
