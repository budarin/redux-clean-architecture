/**
 * Category check constraints:
 *
 *  -   Идентификатор (id) должен быть целочисленного типа.
 *  -   Поле icon_id должно быть целочисленного типа и должно ссылаться на существующую иконку в списке Icons.
 *  -   Обязательно должно присутствовать поле category, и его длина должна быть более 3-х символов и не должна превышать 20 символов.
 *  -   Удаление категории невозможно, если на неё ссылается хотя бы одна задача (Todo).
 */

import { isInt } from '../../common/validation_utils/isInt.ts';
import { inRange } from '../../common/validation_utils/inRange.ts';
import { isString } from '../../common/validation_utils/isString.ts';

import type { ValidationRules } from '../../common/validation_utils/validateEntity.ts';

const MIN_CATEGOTY_LENGTH = 3;
const MAX_CATEGOTY_LENGTH = 20;

export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);
export const validateIconId = ({ icon_id }: Record<string, unknown>): boolean => isInt(icon_id);
export function validateCategory({ category }: Record<string, unknown>): boolean {
    if (isString(category)) {
        return inRange(category.length, MIN_CATEGOTY_LENGTH, MAX_CATEGOTY_LENGTH);
    }

    return false;
}
export const validateIconIdIntegration = (icon_id: number, iconIdsSores: Record<number, any>[]): boolean =>
    !!iconIdsSores.find((idsStore) => Boolean(idsStore[icon_id]));

// validation rules
export const categoryValidationRules: ValidationRules<Todo> = {
    id: [validateId, 'Category обязан иметь id целым числомr'],
    category: [
        validateCategory,
        `Длина названия категории должна быть более ${MIN_CATEGOTY_LENGTH} символов и не превышать ${MAX_CATEGOTY_LENGTH} символов`,
    ],
    icon_id: [validateIconId, 'Category обязан иметь icon_id целым числом'],
};

// Category getter
export function getCategory(input: Record<string, unknown>): Category {
    return {
        id: input['id'],
        icon_id: input['icon_id'],
        category: input['category'],
    } as Category;
}
