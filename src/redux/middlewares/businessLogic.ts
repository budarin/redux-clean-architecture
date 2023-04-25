const actionHandlers = new Map();

//@ts-ignore
export function onAction(actionId: string, handler: (set, get, api) => void) {
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
        try {
            const handler = actionHandlers.get(action.type);

            if (!handler) {
                return originalDispath(action);
            }

            return handler(set, get, api, { ...action, type: 'UPDATE_ENTITIES' });
        } finally {
        }
    };
    return initialState;
};