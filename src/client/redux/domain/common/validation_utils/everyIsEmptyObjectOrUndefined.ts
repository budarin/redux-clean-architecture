import { isEmptyObjectOrUndefined } from './isEmptyObjectOrUndefined';

export function everyIsEmptyObjectOrUndefined(x: Record<string, unknown>): boolean {
    return Object.values(x).every(isEmptyObjectOrUndefined);
}
