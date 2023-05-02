export function flipObject(data: object): object {
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));
}
