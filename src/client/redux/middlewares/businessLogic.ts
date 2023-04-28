const actionHandlers = new Map();

//@ts-ignore
export function onAction(actionId: string, handler: (set, get, api, action) => void) {
    actionHandlers.set(actionId, handler);
}

export function offAction(actionId: string) {
    actionHandlers.delete(actionId);
}

// @ts-ignore
export const businessLogic = (config) => (set, get, api) => {
    const initialState = config(set, get, api);
    const originalDispath = api.dispatch;

    api.dispatch = (action: any) => {
        const handler = actionHandlers.get(action.type);
        return handler ? handler(set, get, { ...api, originalDispath }, action) : originalDispath(action);
    };

    return initialState;
};
