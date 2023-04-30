export function createEmptyState<T>(): T {
    return {
        byId: {},
        ids: [] as number[],
    } as T;
}
