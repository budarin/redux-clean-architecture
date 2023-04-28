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
