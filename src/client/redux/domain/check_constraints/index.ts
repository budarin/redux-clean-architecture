import { UPDATE_ENTITIES } from '../common/actions.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { everyIsEmptyArrayOrUndefined } from '../common/validation_utils/everyIsEmptyArrayOrUndefined.ts';

import { checkTodoConstraints } from './checkTodoConstraints.ts';
import { checkIconConstraints } from './checkIconConstraints.ts';
import { checkStatusConstraints } from './checkStatusConstraints.ts';
import { checkCategoryConstraints } from './checkCategoryConstraints.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

// @ts-ignore
onAction('UPDATE', (get, set, api, action: UpdateEntitiesAction) => {
    // если нет ни одной заполненной сущности - выходим
    if (action.payload.entities && everyIsEmptyArrayOrUndefined(action.payload.entities) === false) {
        const iconIds = {} as IdsHash;
        const statusIds = {} as IdsHash;
        const categoryIds = {} as IdsHash;
        const store = api.getState() as State;
        const { todos, categories, statuses, icons } = action.payload.entities;

        checkIconConstraints(action, store, icons, iconIds);
        checkStatusConstraints(action, store, statuses, statusIds);
        checkCategoryConstraints(action, store, categories, iconIds, categoryIds);
        checkTodoConstraints(action, store, todos, categoryIds, statusIds);

        return api.originalDispath({ ...action, type: UPDATE_ENTITIES });
    }
});
