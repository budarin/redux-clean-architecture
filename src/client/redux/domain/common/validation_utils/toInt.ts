import { isInt } from './isInt.ts';
import { isString } from './isString.ts';

export function toInt(x: unknown): number | undefined {
    if (isInt(x)) {
        return x;
    }
    if (isString(x)) {
        return parseInt(x, 10);
    }
}

export type ToInt = typeof toInt;
