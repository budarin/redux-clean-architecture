import { anyEntityInitialState } from './state.ts';

type EntitiesIndex = keyof EntitiesPayload;

export function normalizeEntitiesPayload(entities: EntitiesPayload): NormalizedEntitiesPayload {
    const newEntities = {} as NormalizedEntitiesPayload;

    Object.keys(entities).forEach((entity) => {
        if (entity) {
            newEntities[entity as keyof NormalizedEntitiesPayload] = anyEntityInitialState;
            const newEntity = newEntities[entity as keyof NormalizedEntitiesPayload] as OneOfEntity;

            entities[entity as EntitiesIndex]?.forEach((item) => {
                newEntity.byId[item.id] = { ...item };
                newEntity.ids.push(item.id);
            });
        }
    });

    return newEntities;
}
