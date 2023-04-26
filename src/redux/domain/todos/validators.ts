import {
    inRange,
    isBoolean,
    isDate,
    isInt,
    isString,
    isUndefined,
    toDefaultBoolean,
    toInt,
    toTimeStamp,
} from '../common/validation_utils';

const MIN_TODO_LENGTH = 5;
const MAX_TODO_LENGTH = 150;

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;

// обязан присутствовать id типа number
export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);

// обязан присутствовать status_id типа number
export const validateStatusId = ({ status_id }: Record<string, unknown>): boolean => isInt(status_id);

// Category_id должен быть типа number
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

export const validateDueDate = ({ due_date }: Record<string, unknown>) => isDate(due_date);

// completed должно быть boolean
export const validateCompleted = ({ completed }: Record<string, unknown>): boolean => isBoolean(completed);

// deleted должно быть boolean
export const validateDeleted = ({ x: deleted }: Record<string, unknown>): boolean =>
    isUndefined(deleted) || isBoolean(deleted);

export function getTodo(input: Record<string, unknown>) {
    return {
        id: input['id'],
        status_id: input['status_id'],
        category_id: input['category_id'],
        todo: input['todo'],
        description: input['description'],
        due_date: input['due_date'],
        deleted: input['deleted'],
        completed: input['completed'],
    };
}

const validationRules = {
    id: [validateId, 'Todo обязан иметь id целым числомr', toInt],
    status_id: [validateStatusId, 'Todo обязан иметь status_id целым числом', toInt],
    category_id: [validateCategoryId, 'Category_id должен быть целым числом', toInt],
    todo: [
        validateTodo,
        `Длина названия todo должна быть более ${MIN_TODO_LENGTH} символов и не превышать ${MAX_TODO_LENGTH} символов`,
    ],
    description: [
        validateDescription,
        `Длина description должна быть более ${MIN_DESCRIPTION_LENGTH} символов и не превышать ${MAX_DESCRIPTION_LENGTH} символов`,
    ],
    due_date: [validateDueDate, 'Due_date - обязательное поле', toTimeStamp],
    completed: [validateCompleted, 'Completed должно быть boolean', toDefaultBoolean(false)],
    deleted: [validateDeleted, 'Deleted должно быть boolean'],
};

export function validateTodoObject(x: Record<string, unknown>): { valid: boolean; errors: Error[] } {
    const errors = [];

    if (!validateId(x)) {
        errors.push(new Error('Todo обязан иметь id целым числомr'));
    }

    if (!validateStatusId(x)) {
        errors.push(new Error('Todo обязан иметь status_id целым числом'));
    }

    if (!validateCategoryId(x)) {
        errors.push(new Error('Category_id должен быть целым числом'));
    }

    if (!validateTodo(x)) {
        errors.push(
            new Error(
                `Длина названия todo должна быть более ${MIN_TODO_LENGTH} символов и не превышать ${MAX_TODO_LENGTH} символов`,
            ),
        );
    }

    if (!validateDescription(x)) {
        errors.push(
            new Error(
                `Длина description должна быть более ${MIN_DESCRIPTION_LENGTH} символов и не превышать ${MAX_DESCRIPTION_LENGTH} символов`,
            ),
        );
    }

    if (!validateCompleted(x)) {
        errors.push(new Error('Completed должно быть boolean'));
    }

    if (!validateDeleted(x)) {
        errors.push(new Error('Deleted должно быть boolean'));
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}
