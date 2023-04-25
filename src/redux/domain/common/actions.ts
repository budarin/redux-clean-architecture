export const UPDATE_ENTITIES = 'UPDATE_ENTITIES' as const;

type entities = {
    todos: Todo[];
    categories: Category[];
    statuse: Status[];
    icons: Icon[];
};

export const updateEntities = (entities: entities) => ({
    type: UPDATE_ENTITIES,
    payload: entities,
});

export type UpdateEntitiesAction = ReturnType<typeof updateEntities>;
