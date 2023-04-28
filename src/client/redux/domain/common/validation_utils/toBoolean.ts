import { isBoolean } from './isBoolean.ts';
import { isString } from './isString';

export function toBoolean(x: unknown): boolean | undefined {
    if (isBoolean(x)) {
        return x;
    }
    if ((isString(x) && x === 'true') || x === 'false') {
        return Boolean(x);
    }
}

export type ToBoolean = typeof toBoolean;
