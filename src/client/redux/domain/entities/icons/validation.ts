import { isInt } from '../../utils/validation_utils/isInt.ts';
import { inRange } from '../../utils/validation_utils/inRange.ts';
import { isString } from '../../utils/validation_utils/isString.ts';

import type { ValidationRules } from '../../utils/validation_utils/validateEntity.ts';

const MIN_ICON_NAME_LENGTH = 5;
const MAX_ICON_NAME_LENGTH = 50;

export const validateId = ({ id }: Record<string, unknown>): boolean => isInt(id);
export function validateName({ name }: Record<string, unknown>): boolean {
    if (isString(name)) {
        return inRange(name.length, MIN_ICON_NAME_LENGTH, MAX_ICON_NAME_LENGTH);
    }

    return false;
}

// validation rules
export const iconValidationRules: ValidationRules<Todo> = {
    id: [validateId, 'обязательное поле id должно быть целочисленным числом'],
    name: [validateName, 'обязательное name name должно быть строкой'],
};

// Category getter
export function getIcon(input: Record<string, unknown>): Icon {
    return {
        id: input['id'],
        name: input['name'],
    } as Icon;
}
