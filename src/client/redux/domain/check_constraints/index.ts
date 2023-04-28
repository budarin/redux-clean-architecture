import { UPDATE_ENTITIES } from '../common/actions.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { everyIsEmptyArrayOrUndefined, getEntity, validateEntity } from '../common/validation_utils.ts';
import { categoryValidationRules, getCategory, validateIconIdIntegration } from '../entities/categories/validation.ts';
import {
    getTodo,
    todoConverters,
    todoValidationRules,
    validateCategoryIdIntegration,
    validateStatusIdIntegration,
} from '../entities/todos/validators.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

type IdsHash = Record<number, boolean>;

const ICON_ID_ERROR_MESSAGE = 'Значение icon_id отсутствует в Icons';
const STATUS_ID_ERROR_MESSAGE = 'Значение status_id отсутствует в Statuses';
const CATEGORY_ID_ERROR_MESSAGE = 'Значение category_id отсутствует в Categories';

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

        if (categories && categories.length > 0) {
            const newCategories = [] as Category[];

            categories.forEach((category, i) => {
                let linksAreCorrect = true;
                const newCategory = category;
                const { valid, errors } = validateEntity<Category>(newCategory, categoryValidationRules);
                const { icon_id } = newCategory;

                // проверить существуют ли icon_id в Icons
                if (icon_id && validateIconIdIntegration(icon_id, [store.icons.byId, iconIds]) === false) {
                    linksAreCorrect = false;
                    errors['icon_id'] = ICON_ID_ERROR_MESSAGE;
                    console.log(ICON_ID_ERROR_MESSAGE);
                }

                if (valid && linksAreCorrect) {
                    newCategories.push(getCategory(newCategory));
                    categoryIds[category.id] = true;
                } else {
                    console.error('Category', { newCategory, errors });
                    // generate Error
                }
            });
        }

        if (todos && todos.length > 0) {
            const newTodos = [] as Todo[];

            todos.forEach((todo, i) => {
                let linksAreCorrect = true;
                const newTodo = getEntity<Todo>(todo, todoConverters);
                const { valid, errors } = validateEntity<Todo>(newTodo, todoValidationRules);
                const { status_id, category_id } = newTodo;

                // проверить существуют ли status_id в Statuse
                if (status_id && validateStatusIdIntegration(status_id, [store.statuses.byId, statusIds]) === false) {
                    linksAreCorrect = false;
                    errors['status_id'] = STATUS_ID_ERROR_MESSAGE;
                    console.log(STATUS_ID_ERROR_MESSAGE);
                }

                // проверить существуют ли category_id в Categories
                if (
                    category_id &&
                    validateCategoryIdIntegration(category_id, [store.categories.byId, categoryIds]) === false
                ) {
                    linksAreCorrect = false;
                    errors['category_id'] = CATEGORY_ID_ERROR_MESSAGE;
                    console.log(CATEGORY_ID_ERROR_MESSAGE);
                }

                if (valid && linksAreCorrect) {
                    newTodos.push(getTodo(newTodo));
                } else {
                    console.error('Todo', { newTodo, errors });
                    // generate Error
                }
            });

            action.payload.entities.todos = newTodos;
        }

        return api.dispatch({ ...action, type: UPDATE_ENTITIES });
    }
});
