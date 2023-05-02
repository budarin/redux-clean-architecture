import { navigationFilters } from '../entities/navigationFilter/index.ts';

export function createEmptyTodoState(): TodoState {
    const todoState = {
        byId: {} as TodoById,
        ids: [] as number[],
        idsByCategoryId: {} as TodoIdsByCategoryId,
        idsByFilterId: {} as TodoIdsByFilterId,
    };

    Object.keys(navigationFilters).forEach((filter) => {
        todoState.idsByFilterId[filter] = [] as number[];
    });

    return todoState;
}
