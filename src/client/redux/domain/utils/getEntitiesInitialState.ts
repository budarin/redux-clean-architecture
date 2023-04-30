import { createEmptyState } from './createEmptyState.ts';

// store initial state

export function getEntitiesInitialState(): {
    icons: IconState;
    statuses: StatusState;
    categories: CategoriyState;
    todos: TodoState;
} {
    return {
        icons: createEmptyState<IconState>(),
        statuses: createEmptyState<StatusState>(),
        categories: createEmptyState<CategoriyState>(),
        todos: createEmptyState<TodoState>(),
    };
}
