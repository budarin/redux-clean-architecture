export type ValidationRules<T> = Record<string, [(x: any) => boolean, string]>;

export function validateEntity<T>(
    entity: OneOfEntities,
    rules: ValidationRules<T>,
): { valid: boolean; errors: Record<string, string> } {
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
