export const isExists = (x: unknown): boolean => Boolean(x);
export const isNotExists = (x: unknown): boolean => !isExists(x);
export const isUndefined = (x: any): boolean => x === undefined;

export const isString = (x: unknown): x is string => typeof x === 'string';
export const isNumber = (x: unknown): x is number => typeof x === 'number';
export const isNumberLike = (x: unknown): boolean =>
    typeof x === 'number' || (typeof x === 'number' && isNaN(Number(x)) === false);
export const isInt = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x);
export const isFloat = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x) === false;
export const isBoolean = (x: unknown): x is number => typeof x === 'boolean';
export const inRange = (num: number, min: number, max: number): boolean => num >= min && num <= max;
