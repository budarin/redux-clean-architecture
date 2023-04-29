/**
 *  Todo check constraints:
 *
 *  -   Идентификатор (id) должен быть целочисленного типа.
 *  -   Поле status_id должно быть целочисленного типа и должно ссылаться на существующий статус в списке Statuses.
 *  -   Поле category_id должно быть целочисленного типа и должно ссылаться на существующую категорию в списке Categories, либо оно может быть неопределенным.
 *  -   Длина поля todo должна быть не менее 5 символов и не более 150 символов.
 *  -   Поле description должно иметь длину не менее 10 символов и не более 1000 символов, либо оно может быть неопределенным.
 *  -   Поле deleted должно быть логическим типом и по умолчанию должно быть установлено в false.
 *  -   Поле completed должно быть логическим типом и по умолчанию должно быть установлено в false, либо оно может быть неопределенным.
 */

import { isInt } from '../../common/validation_utils/isInt';
import { inRange } from '../../common/validation_utils/inRange';
import { isString } from '../../common/validation_utils/isString';
import { isBoolean } from '../../common/validation_utils/isBoolean';
import { isUndefined } from '../../common/validation_utils/isUndefined';
import { isTimeStamp } from '../../common/validation_utils/isTimeStamp';
import { isNotExists } from '../../common/validation_utils/isNotExists';
import { toDefaultBoolean } from '../../common/validation_utils/toDefaultBoolean';

import type { TypeConverters } from '../../common/validation_utils/getEntity.ts';
import type { ValidationRules } from '../../common/validation_utils/validateEntity.ts';

const MIN_TODO_LENGTH = 5;
const MAX_TODO_LENGTH = 150;

const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 1000;

export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);
export const validateStatusId = ({ status_id }: Record<string, unknown>): boolean => isInt(status_id);
export const validateCategoryId = ({ category_id }: Record<string, unknown>): boolean =>
    isUndefined(category_id) || isInt(category_id);
export const validateDueDate = ({ due_date }: Record<string, unknown>) =>
    isNotExists(due_date) || isTimeStamp(due_date);
export const validateCompleted = ({ completed }: Record<string, unknown>): boolean => isBoolean(completed);
export const validateDeleted = ({ x: deleted }: Record<string, unknown>): boolean =>
    isUndefined(deleted) || isBoolean(deleted);
export function validateTodo({ todo }: Record<string, unknown>): boolean {
    if (isString(todo)) {
        return inRange(todo.length, MIN_TODO_LENGTH, MAX_TODO_LENGTH);
    }

    return false;
}
export function validateDescription({ description }: Record<string, unknown>): boolean {
    if (isUndefined(description)) {
        return true;
    }

    if (isString(description)) {
        return description.length > MIN_DESCRIPTION_LENGTH && description.length <= MAX_DESCRIPTION_LENGTH;
    }

    return false;
}
export const validateStatusIdIntegration = (status_id: number, statusIdsSores: Record<number, any>[]): boolean =>
    !!statusIdsSores.find((idsStore) => Boolean(idsStore[status_id]));

export const validateCategoryIdIntegration = (category_id: number, categoryIdsSores: Record<number, any>[]): boolean =>
    !!categoryIdsSores.find((idsStore) => Boolean(idsStore[category_id]));

// coverters
export const todoConverters: TypeConverters = {
    completed: toDefaultBoolean(false),
};

// validation rules
export const todoValidationRules: ValidationRules<Todo> = {
    id: [validateId, 'обязательное поле id должно быть целым числом'],
    status_id: [validateStatusId, 'обязательное поле status_id должно быть целым числом'],
    category_id: [validateCategoryId, 'необязательное поле category_id должно быть целым числом'],
    todo: [
        validateTodo,
        `длина названия todo должна быть более ${MIN_TODO_LENGTH} символов и не превышать ${MAX_TODO_LENGTH} символов`,
    ],
    description: [
        validateDescription,
        `длина description должна быть более ${MIN_DESCRIPTION_LENGTH} символов и не превышать ${MAX_DESCRIPTION_LENGTH} символов`,
    ],
    due_date: [validateDueDate, 'необязательное поле due_date должно быть значением timestamp'],
    completed: [validateCompleted, 'поле completed должно быть boolean'],
    deleted: [validateDeleted, 'поле deleted должно быть boolean'],
};

// Todo getter
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
