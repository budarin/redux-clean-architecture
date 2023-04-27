// any entity initial state
export const anyEntityInitialState = {
    byId: {},
    ids: [] as number[],
};

// store initial state
export const entitiesInitialState = {
    icons: anyEntityInitialState as IconState,
    statuses: anyEntityInitialState as StatusState,
    categories: anyEntityInitialState as CategoriyState,
    todos: anyEntityInitialState as TodoState,
};

export function createEmptyState<T>(): T {
    return {
        byId: {},
        ids: [] as number[],
    } as T;
}

export function getNewState<T extends OneOfEntitiyState>(state: T): T {
    const newSate = {
        byId: {
            ...state.byId,
        },
        ids: state.ids,
    } as T;

    return newSate;
}
