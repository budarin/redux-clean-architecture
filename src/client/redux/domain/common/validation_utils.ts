// валидаторы
export const isExists = (x: unknown): boolean => Boolean(x);
export const isNotExists = (x: unknown): boolean => !isExists(x);
export const isUndefined = (x: any): boolean => x === undefined;
export const isString = (x: unknown): x is string => typeof x === 'string';
export const isNumber = (x: unknown): x is number => typeof x === 'number';
export const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
export const isNumberLike = (x: unknown): boolean =>
    typeof x === 'number' || (typeof x === 'number' && isNaN(Number(x)) === false);
export const isInt = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x);
export const isFloat = (x: unknown): x is number => typeof x === 'number' && Number.isInteger(x) === false;
export const inRange = (num: number, min: number, max: number): boolean => num >= min && num <= max;
export const isDate = (x: unknown) => isInt(x);

// конверторы
export const toTimeStamp = (x: string | number): number => {
    if (isString(x)) {
        return Date.parse(x);
    }

    return x;
};
export const toInt = (x: unknown) => {
    if (isString(x)) {
        return parseInt(x, 10);
    }

    return x;
};

export const toBoolean = (x: unknown) => {
    if (isString(x)) {
        return Boolean(x);
    }
    return x;
};

export const toDefaultBoolean =
    (byDefault: boolean | undefined): ((x: unknown) => boolean | undefined) =>
    (x: unknown) => {
        if (isString(x)) {
            return Boolean(x);
        }
        if (isUndefined(x)) {
            return byDefault || false;
        }
    };
