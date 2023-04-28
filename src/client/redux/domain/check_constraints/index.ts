import { UPDATE_ENTITIES } from '../common/actions.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { everyIsEmptyArrayOrUndefined } from '../common/validation_utils.ts';

import { checkTodoConstraints } from './checkTodoConstraints.ts';
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

        if (icons && icons.length > 0) {
            // -   обязан присутствовать id типа integer
            // -   обязан присутствовать name

            icons.forEach((icon, i) => {
                const newIcon = icon;
                icons[i] = newIcon;

                iconIds[icon.id] = true;
            });
        }

        if (statuses && statuses.length > 0) {
            // -   обязан присутствовать id типа integer
            // -   обязан присутствовать ststus_id
            // -   обязан присутствовать color

            statuses.forEach((status, i) => {
                statusIds[status.id] = true;
            });
        }

        checkCategoryConstraints(action, store, categories, iconIds, categoryIds);
        checkTodoConstraints(action, store, todos, categoryIds, statusIds);

        return api.originalDispath({ ...action, type: UPDATE_ENTITIES });
    }
});
