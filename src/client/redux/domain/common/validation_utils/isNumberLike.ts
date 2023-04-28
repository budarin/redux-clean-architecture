export function isNumberLike(x: unknown): boolean {
    return typeof x === 'number' || (typeof x === 'string' && isNaN(Number(x)) === false);
}
