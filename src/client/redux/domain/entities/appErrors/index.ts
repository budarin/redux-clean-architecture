export const SET_APP_ERROR = 'SET_APP_ERROR' as const;

export function setAppError(error: AppErrorMessage) {
    return {
        type: SET_APP_ERROR,
        payload: { error },
    };
}

type SetAppErrorAction = ReturnType<typeof setAppError>;

const initialState = [] as ApplicationErrors;

export default function appErrorsReducer(state: ApplicationErrors = initialState, action: SetAppErrorAction) {
    switch (action.type) {
        case SET_APP_ERROR: {
            return [...state, action.payload.error];
        }

        default:
            return state;
    }
}
