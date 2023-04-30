import { getAnyEntityInitialState } from './getAnyEntityInitialState';

// store initial state

export function getEntitiesInitialState(): {
    icons: IconState;
    statuses: StatusState;
    categories: CategoriyState;
    todos: TodoState;
} {
    return {
        icons: getAnyEntityInitialState() as IconState,
        statuses: getAnyEntityInitialState() as StatusState,
        categories: getAnyEntityInitialState() as CategoriyState,
        todos: getAnyEntityInitialState() as TodoState,
    };
}
