import { isInt } from '../../utils/validation_utils/isInt.ts';
import { inRange } from '../../utils/validation_utils/inRange.ts';
import { isString } from '../../utils/validation_utils/isString.ts';

import type { ValidationRules } from '../../utils/validation_utils/validateEntity.ts';

const MIN_STATUS_LENGTH = 3;
const MAX_STATUS_LENGTH = 20;

export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);
export const validateColor = ({ color }: Record<string, unknown>): boolean => isString(color) && color.length === 7;
export function validateStatus({ status }: Record<string, unknown>): boolean {
    if (isString(status)) {
        return inRange(status.length, MIN_STATUS_LENGTH, MAX_STATUS_LENGTH);
    }

    return false;
}

// validation rules
export const statusValidationRules: ValidationRules<Todo> = {
    id: [validateId, 'обязательное поле id должно быть целочисленным числом'],
    status: [
        validateStatus,
        `Длина названия статуса должна быть более ${MIN_STATUS_LENGTH} символов и не превышать ${MAX_STATUS_LENGTH} символов`,
    ],
    color: [validateColor, 'обязательное поле color должно быть строкой из 7 символов'],
};

// Category getter
export function getStatus(input: Record<string, unknown>): Status {
    return {
        id: input['id'],
        status: input['status'],
        color: input['color'],
    } as Status;
}
