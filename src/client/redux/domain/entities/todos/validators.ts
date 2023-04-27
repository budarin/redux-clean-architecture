import {
    TypeConverters,
    ValidationRules,
    inRange,
    isBoolean,
    isDate,
    isInt,
    isNotExists,
    isString,
    isUndefined,
    toDefaultBoolean,
} from '../../common/validation_utils';

const MIN_TODO_LENGTH = 5;
const MAX_TODO_LENGTH = 150;

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;

export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);
export const validateStatusId = ({ status_id }: Record<string, unknown>): boolean => isInt(status_id);
export const validateCategoryId = ({ category_id }: Record<string, unknown>): boolean =>
    isUndefined(category_id) || isInt(category_id);

// длина todo должна быть более 5 символов и не превышать 150 символов
function validateTodo({ todo }: Record<string, unknown>): boolean {
    if (isString(todo)) {
        return inRange(todo.length, MIN_TODO_LENGTH, MAX_TODO_LENGTH);
    }
    return false;
}

// длина description должна быть более 5 символов и не превышать 1000 символов
export function validateDescription({ description }: Record<string, unknown>): boolean {
    if (isUndefined(description)) {
        return true;
    }

    if (isString(description)) {
        return description.length > MIN_DESCRIPTION_LENGTH && description.length <= MAX_DESCRIPTION_LENGTH;
    }

    return false;
}

export const validateDueDate = ({ due_date }: Record<string, unknown>) => isNotExists(due_date) || isDate(due_date);
export const validateCompleted = ({ completed }: Record<string, unknown>): boolean => isBoolean(completed);
export const validateDeleted = ({ x: deleted }: Record<string, unknown>): boolean =>
    isUndefined(deleted) || isBoolean(deleted);
export const todosConverters: TypeConverters = {
    completed: toDefaultBoolean(false),
};

export const todosValidationRules: ValidationRules<Todo> = {
    id: [validateId, 'Todo обязан иметь id целым числомr'],
    status_id: [validateStatusId, 'Todo обязан иметь status_id целым числом'],
    category_id: [validateCategoryId, 'Category_id должен быть целым числом'],
    todo: [
        validateTodo,
        `Длина названия todo должна быть более ${MIN_TODO_LENGTH} символов и не превышать ${MAX_TODO_LENGTH} символов`,
    ],
    description: [
        validateDescription,
        `Длина description должна быть более ${MIN_DESCRIPTION_LENGTH} символов и не превышать ${MAX_DESCRIPTION_LENGTH} символов`,
    ],
    due_date: [validateDueDate, 'Due_date должно содержать целое число, содержащее значение даты:времени'],
    completed: [validateCompleted, 'Completed должно быть boolean'],
    deleted: [validateDeleted, 'Deleted должно быть boolean'],
};

export function getTodo(input: Record<string, unknown>): Todo {
    return {
        id: input['id'],
        status_id: input['status_id'],
        category_id: input['category_id'],
        todo: input['todo'],
        description: input['description'],
        due_date: input['due_date'],
        deleted: input['deleted'],
        completed: input['completed'],
    } as Todo;
}
