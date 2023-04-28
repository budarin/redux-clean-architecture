import { isString } from './isString.ts';
import { isBoolean } from './isBoolean.ts';
import { isUndefined } from './isUndefined.ts';

export function toDefaultBoolean(byDefault: boolean | undefined): (x: unknown) => boolean | undefined {
    return (x: unknown) => {
        if (isBoolean(x)) {
            return x;
        }
        if (isString(x) && (x === 'true' || x === 'false')) {
            return Boolean(x);
        }
        if (isUndefined(x)) {
            return byDefault;
        }
    };
}

export type ToDefaultBoolean = typeof toDefaultBoolean;
