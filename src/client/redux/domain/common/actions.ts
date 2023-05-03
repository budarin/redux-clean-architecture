export const RESET_STATE = 'RESET_STATE' as const;

export const INTERNAL_UPDATE_ENTITIES = 'INTERNAL_UPDATE_ENTITIES' as const;
export function internalUpdateEntities(entities?: EntitiesPayload) {
    return {
        type: INTERNAL_UPDATE_ENTITIES,
        payload: { entities },
    };
}
export type InternalUpdateEntitiesAction = ReturnType<typeof internalUpdateEntities>;

export const UPDATE_ENTITIES = 'UPDATE_ENTITIES' as const;
export function updateEntities(entities?: EntitiesPayload) {
    return {
        type: UPDATE_ENTITIES,
        payload: { entities },
    };
}

export type UpdateEntitiesAction = ReturnType<typeof updateEntities>;

export const DELETE_ENTITY = 'DELETE_ENTITY' as const;
export function deleteEntity(id: Id, entityName: string) {
    return {
        type: DELETE_ENTITY,
        payload: { id, entityName },
    };
}

export type DeleteEntityAction = ReturnType<typeof deleteEntity>;
