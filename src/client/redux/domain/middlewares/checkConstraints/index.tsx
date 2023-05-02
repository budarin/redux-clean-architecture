import { toast } from 'react-toastify';
import { onAction } from '../../../middlewares/businessLogic.ts';

import { INTERNAL_UPDATE_ENTITIES, UPDATE_ENTITIES, UpdateEntitiesAction } from '../../common/actions.ts';
import { everyIsEmptyArrayOrUndefined } from '../../utils/validation_utils/everyIsEmptyArrayOrUndefined.ts';

import { checkCategoryConstraints } from './checkCategoryConstraints.ts';
import { checkIconConstraints } from './checkIconConstraints.ts';
import { checkStatusConstraints } from './checkStatusConstraints.ts';
import { checkTodoConstraints } from './checkTodoConstraints.ts';
import React from 'react';

// @ts-ignore
// регистрируем middleware который обрабатывает UPDATE_ENTITIES action
// с целью проверки целостности обновляемых в store данных
onAction(UPDATE_ENTITIES, (get, set, api, action: UpdateEntitiesAction) => {
    if (action.payload.entities && everyIsEmptyArrayOrUndefined(action.payload.entities) === false) {
        const iconIds = {} as IdsHash;
        const statusIds = {} as IdsHash;
        const categoryIds = {} as IdsHash;

        let isValidIcon = true;
        let isValidStatus = true;
        let isValidCategory = true;
        let isValidTodo = true;

        const store = api.getState() as State;
        const { todos, categories, statuses, icons } = action.payload.entities;

        if (icons && icons.length > 0) {
            isValidIcon = checkIconConstraints(action, icons, iconIds);
        }

        if (statuses && statuses.length > 0) {
            isValidStatus = checkStatusConstraints(action, statuses, statusIds);
        }

        if (categories && categories.length > 0) {
            isValidCategory = checkCategoryConstraints(action, store, categories, iconIds, categoryIds);
        }

        if (todos && todos.length > 0) {
            isValidTodo = checkTodoConstraints(action, store, todos, categoryIds, statusIds);
        }

        toast.error(
            <>
                <p>Часть данных являются не консистентными и поэтому не будут отображены!</p>
                <p>Не волнуйтесь - мы уже работаем над этой проблемой</p>
                <p>Если данные отображаются не верно - попробуйте позже</p>
            </>,
            { autoClose: false },
        );
        if (!isValidIcon && isValidStatus && isValidCategory && isValidTodo) {
        }

        return api.originalDispatch({ ...action, type: INTERNAL_UPDATE_ENTITIES });
    }
});
