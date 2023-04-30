import { isEmptyArrayOrUndefined } from './isEmptyArrayOrUndefined';

export function everyIsEmptyArrayOrUndefined(x: Record<string, unknown>): boolean {
    return Object.values(x).every(isEmptyArrayOrUndefined);
}
