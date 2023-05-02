type Dispatch = (Action: Action) => void;

export function getDispatch(state: State): Dispatch {
    return state.dispatch;
}
