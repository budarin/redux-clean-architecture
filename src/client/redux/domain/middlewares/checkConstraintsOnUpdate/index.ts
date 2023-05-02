import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { UPDATE_TODO } from '../../entities/todos/index.ts';
import { onAction } from '../../../middlewares/businessLogic.ts';
import { everyIsEmptyArrayOrUndefined } from '../../utils/validation_utils/everyIsEmptyArrayOrUndefined.ts';

// check constraints utilities
import { checkTodoConstraints } from './checkTodoConstraints.ts';
import { checkIconConstraints } from './checkIconConstraints.ts';
import { checkStatusConstraints } from './checkStatusConstraints.ts';
import { checkCategoryConstraints } from './checkCategoryConstraints.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

// @ts-ignore
onAction(UPDATE_TODO, (get, set, api, action: UpdateEntitiesAction) => {
    if (action.payload.entities && everyIsEmptyArrayOrUndefined(action.payload.entities) === false) {
        const iconIds = {} as IdsHash;
        const statusIds = {} as IdsHash;
        const categoryIds = {} as IdsHash;
        const store = api.getState() as State;
        const { todos, categories, statuses, icons } = action.payload.entities;

        if (icons && icons.length > 0) {
            checkIconConstraints(action, icons, iconIds);
        }

        if (statuses && statuses.length > 0) {
            checkStatusConstraints(action, statuses, statusIds);
        }

        if (categories && categories.length > 0) {
            checkCategoryConstraints(action, store, categories, iconIds, categoryIds);
        }

        if (todos && todos.length > 0) {
            checkTodoConstraints(action, store, todos, categoryIds, statusIds);
        }

        return api.originalDispatch({ ...action, type: UPDATE_ENTITIES });
    }
});
