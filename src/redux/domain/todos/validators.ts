export function validateId(value: unknown): boolean {
    return typeof value === 'number';
}

export function validateTodo(value: unknown): boolean {
    return typeof value === 'string' && value.length <= 150;
}

export function validateDescription(value: unknown): boolean {
    return value === undefined || (typeof value === 'string' && value.length <= 1000);
}

export function validateDeleted(value: unknown): boolean {
    return typeof value === 'boolean';
}

export function validateStatusId(value: unknown): boolean {
    return typeof value === 'number';
}
