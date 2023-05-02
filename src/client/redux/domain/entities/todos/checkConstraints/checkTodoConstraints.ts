import {
    getTodoFomUnknownObject,
    todoConverters,
    todoValidationRules,
    validateStatusIdRelation,
    validateCategoryIdRelation,
} from '../validators.ts';

import { applyEntityConverters } from '../../../utils/validation_utils/getEntity.ts';
import { checkEntityValidation } from '../../../utils/validation_utils/validateEntity.ts';

import type { UpdateEntitiesAction } from '../../../common/actions.ts';

const STATUS_ID_ERROR_MESSAGE = 'Todos: Значение status_id отсутствует в Statuses';
const CATEGORY_ID_ERROR_MESSAGE = 'Todos: Значение category_id отсутствует в Categories';

export function checkTodoConstraints(
    action: UpdateEntitiesAction,
    store: State,
    todos: Todo[] | undefined,
    categoryIds: IdsHash,
    statusIds: IdsHash,
): boolean {
    let hasErrors = false;
    const newTodos = [] as Todo[];

    todos!.forEach((todo, i) => {
        let linksAreCorrect = true;

        const newTodo = applyEntityConverters<Todo>(todo, todoConverters);

        const { valid, errors } = checkEntityValidation<Todo>(newTodo, todoValidationRules, 'Categories');
        const { status_id, category_id } = newTodo;

        // проверить существуют ли status_id в Statuse
        if (status_id && validateStatusIdRelation(status_id, [store.statuses.byId, statusIds]) === false) {
            linksAreCorrect = false;
            errors['status_id'] = STATUS_ID_ERROR_MESSAGE;
            console.log(STATUS_ID_ERROR_MESSAGE);
            hasErrors = true;
        }

        // проверить существуют ли category_id в Categories
        if (category_id && validateCategoryIdRelation(category_id, [store.categories.byId, categoryIds]) === false) {
            linksAreCorrect = false;
            errors['category_id'] = CATEGORY_ID_ERROR_MESSAGE;
            console.log(CATEGORY_ID_ERROR_MESSAGE);
            hasErrors = true;
        }

        if (valid && linksAreCorrect) {
            newTodos.push(getTodoFomUnknownObject(newTodo));
        } else {
            console.error('Todo', { newTodo, errors });
            hasErrors = true;
            // generate Error
        }
    });

    action.payload.entities!.todos = newTodos;

    return hasErrors;
}
