import { UPDATE_ENTITIES } from '../common/actions.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { everyIsEmptyArrayOrUndefined, getConvertedEntity, validateEntity } from '../common/validation_utils.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';
import { getTodo, todosConverters, todosValidationRules } from '../entities/todos/validators.ts';

const NOT_FOUND = -1;

type IdsHash = Record<number, boolean>;

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
            // -   обязан присутствовать ststus
            // -   обязан присутствовать color

            statuses.forEach((status, i) => {
                statusIds[status.id] = true;
            });
        }

        if (categories && categories.length > 0) {
            // Category
            // -   обязан присутствовать id типа integer
            // -   icon_id должен быть типа number и должен присутствовать Icons
            // -   category обязательное поле и его длина названия не должна превышать 20 символов
            // -   нельзя удалять Category если есть todo, у которого установлен category_id равный id, удаляемой категории

            categories.forEach((category, i) => {
                categoryIds[category.id] = true;
            });
        }

        if (todos && todos.length > 0) {
            const newTodos = [] as Todo[];

            todos.forEach((todo, i) => {
                let linksAreCorrect = true;
                const newTodo = getConvertedEntity<Todo>(todo, todosConverters);
                const { valid, errors } = validateEntity<Todo>(newTodo, todosValidationRules);
                const { status_id, category_id } = newTodo;

                // проверить существуют ли status_id в Statuse
                if (
                    status_id &&
                    store.statuses.ids.indexOf(status_id) === NOT_FOUND &&
                    statusIds[status_id] === undefined
                ) {
                    linksAreCorrect = false;
                    const errorMsg = 'Значение status_id отсутствует в Statuses';

                    errors['status_id'] = errorMsg;
                    console.log(errorMsg);
                }

                // проверить существуют ли category_id в Categories
                if (
                    category_id &&
                    store.categories.ids.indexOf(category_id) === NOT_FOUND &&
                    categoryIds[category_id] === undefined
                ) {
                    linksAreCorrect = false;
                    const errorMsg = 'Значение category_id отсутствует в Categories';

                    errors['category_id'] = errorMsg;
                    console.log(errorMsg);
                }

                if (valid && linksAreCorrect) {
                    newTodos[i] = getTodo(newTodo);
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
