// @ts-ignore
export const logger = (config) => (set, get, api) => {
    const initialState = config(set, get, api);
    const originalDispath = api.dispatch;

    api.dispatch = (action: any) => {
        console.log('  prev state', JSON.parse(JSON.stringify(get())));
        console.log('  applying', JSON.parse(JSON.stringify(action)));
        try {
            return originalDispath(action);
        } finally {
            console.log('  new state', get());
        }
    };

    return initialState;
};
