import { inRange, isBoolean, isInt, isString, isUndefined } from '../common/validation_utils';

const MIN_TODO_LENGTH = 5;
const MAX_TODO_LENGTH = 150;

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;

// обязан присутствовать id типа number
export const validateId = (x: unknown): boolean => isInt(x);

// обязан присутствовать status_id типа number
export const validateStatusId = (x: unknown): boolean => isInt(x);

// Category_id должен быть типа number
export const validateCategoryId = (x: unknown): boolean => isUndefined(x) || isInt(x);

// длина todo должна быть более 5 символов и не превышать 150 символов
function validateTodo(x: unknown): boolean {
    if (isString(x)) {
        return inRange(x.length, MIN_TODO_LENGTH, MAX_TODO_LENGTH);
    }
    return false;
}

// длина description должна быть более 5 символов и не превышать 1000 символов
export function validateDescription(x: unknown): boolean {
    if (isUndefined(x)) {
        return true;
    }

    if (isString(x)) {
        return x.length > MIN_DESCRIPTION_LENGTH && x.length <= MAX_DESCRIPTION_LENGTH;
    }

    return false;
}

// completed должно быть boolean
export const validateCompleted = (x: unknown): boolean => isBoolean(x);

// deleted должно быть boolean
export const validateDeleted = (x: unknown): boolean => isUndefined(x) || isBoolean(x);

export function validateTodoObject(input: Record<string, any>): { error: Error[] } | { todo: Todo } {
    const error = [];

    if (!validateId(input['id'])) {
        error.push(new Error('Todo обязан иметь id целым числомr'));
    }

    if (!validateStatusId(input['status_id'])) {
        error.push(new Error('Todo обязан иметь status_id целым числом'));
    }

    if (!validateCategoryId(input['category_id'])) {
        error.push(new Error('Category_id должен быть целым числом'));
    }

    if (!validateTodo(input['todo'])) {
        error.push(
            new Error(
                `Длина названия todo должна быть более ${MIN_TODO_LENGTH} символов и не превышать ${MAX_TODO_LENGTH} символов`,
            ),
        );
    }

    if (!validateDescription(input['description'])) {
        error.push(
            new Error(
                `Длина description должна быть более ${MIN_DESCRIPTION_LENGTH} символов и не превышать ${MAX_DESCRIPTION_LENGTH} символов`,
            ),
        );
    }

    if (!validateCompleted(input['completed'])) {
        error.push(new Error('Completed должно быть boolean'));
    }

    if (!validateDeleted(input['deleted'])) {
        error.push(new Error('Deleted должно быть boolean'));
    }

    if (error.length > 0) {
        return {
            error,
        };
    }

    return {
        todo: getTodo(input),
    };
}

export function getTodo(input: Record<string, any>): Todo {
    return {
        id: input['id'],
        status_id: input['status_id'],
        category_id: input['category_id'],
        todo: input['todo'],
        description: input['description'],
        due_date: input['due_date'],
        deleted: input['deleted'] || false,
        completed: input['completed'],
    };
}
