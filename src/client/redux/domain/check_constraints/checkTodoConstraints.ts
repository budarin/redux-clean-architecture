import {
    getTodo,
    todoConverters,
    todoValidationRules,
    validateCategoryIdIntegration,
    validateStatusIdIntegration,
} from '../entities/todos/validators.ts';
import { validateEntity } from '../utils/validation_utils/validateEntity.ts';
import { getEntity } from '../utils/validation_utils/getEntity.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

const STATUS_ID_ERROR_MESSAGE = 'Todos: Значение status_id отсутствует в Statuses';
const CATEGORY_ID_ERROR_MESSAGE = 'Todos: Значение category_id отсутствует в Categories';

export function checkTodoConstraints(
    action: UpdateEntitiesAction,
    store: State,
    todos: Todo[] | undefined,
    categoryIds: IdsHash,
    statusIds: IdsHash,
): void {
    if (todos && todos.length > 0) {
        const newTodos = [] as Todo[];

        todos.forEach((todo, i) => {
            let linksAreCorrect = true;
            const newTodo = getEntity<Todo>(todo, todoConverters);
            const { valid, errors } = validateEntity<Todo>(newTodo, todoValidationRules, 'Categories');
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

        action.payload.entities!.todos = newTodos;
    }
}
