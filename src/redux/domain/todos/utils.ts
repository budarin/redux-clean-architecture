export function getNewEmptyTodoState() {
    return {
        byId: {},
        ids: [],
    } as TodoState;
}

export function getNewTodoState(state: TodoState) {
    const newSate = {
        byId: {
            ...state.byId,
        },
        ids: state.ids,
    };

    return newSate;
}
