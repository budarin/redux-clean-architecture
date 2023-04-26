export const RESET_STATE = 'RESET_STATE' as const;
export const UPDATE_ENTITIES = 'UPDATE_ENTITIES' as const;

export const updateEntities = (entities?: EntitiesPayload) => ({
    type: UPDATE_ENTITIES,
    payload: { entities },
});

export type UpdateEntitiesAction = ReturnType<typeof updateEntities>;
