export function getNewState<T extends OneOfEntitiyState>(state: T): T {
    const newSate = {
        byId: {
            ...state.byId,
        },
        ids: state.ids,
    } as T;

    return newSate;
}
