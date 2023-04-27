// валидаторы
export const isExists = (x: unknown): boolean => Boolean(x);
export const isNotExists = (x: unknown): boolean => !isExists(x);
export const isUndefined = (x: any): boolean => x === undefined;
export const isString = (x: unknown): x is string => typeof x === 'string';
export const isNumber = (x: unknown): x is number => typeof x === 'number';
export const isBoolean = (x: unknown): x is boolean => typeof x === 'boolean';
export const isObject = (x: unknown): x is object => typeof x === 'object';
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
export const toInt = (x: unknown): number | unknown => {
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
            return byDefault;
        }
    };

type TypeConverter = typeof toTimeStamp | typeof toInt | typeof toBoolean | typeof toDefaultBoolean;

export type TypeConverters = Record<string, TypeConverter>;
export type ValidationRules<T> = Record<string, [(x: any) => boolean, string]>;

export function getConvertedEntity<T>(entity: T, convertes: TypeConverters): T {
    Object.keys(convertes).forEach((propName) => {
        const key = propName as keyof T;
        const value = entity[key];
        //@ts-ignore
        entity[key] = convertes[propName](value);
    });

    return entity;
}
export function validateEntity<T>(entity: OneOfEntities, rules: ValidationRules<T>) {
    const errors = {} as Record<string, string>;
    let hasNoErrors = true;

    Object.keys(rules).forEach((propName) => {
        const rule = rules[propName];
        const [validator, errorMessage] = rule;

        if (validator(entity) === false) {
            errors[propName] = errorMessage;
            hasNoErrors && (hasNoErrors = false);
        }
    });

    return {
        valid: hasNoErrors,
        errors,
    };
}

export const isEmptyObjectOrUndefined = (x: unknown) => isNotExists(x) || (isObject(x) && Object.keys(x).length === 0);
export const everyIsEmptyObjectOrUndefined = (x: Record<string, unknown>) =>
    Object.values(x).every(isEmptyObjectOrUndefined);

export const isEmptyArrayOrUndefined = (x: unknown) => isNotExists(x) || (Array.isArray(x) && x.length === 0);
export const everyIsEmptyArrayOrUndefined = (x: Record<string, unknown>) =>
    Object.values(x).every(isEmptyArrayOrUndefined);
