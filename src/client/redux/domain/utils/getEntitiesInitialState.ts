import { createEmptyState } from './createEmptyState.ts';

type EntitiesInitialState = {
    icons: IconState;
    statuses: StatusState;
    categories: CategoriyState;
    todos: TodoState;
};

export function getEntitiesInitialState(): EntitiesInitialState {
    return {
        icons: createEmptyState<IconState>(),
        statuses: createEmptyState<StatusState>(),
        categories: createEmptyState<CategoriyState>(),
        todos: createEmptyState<TodoState>(),
    };
}
