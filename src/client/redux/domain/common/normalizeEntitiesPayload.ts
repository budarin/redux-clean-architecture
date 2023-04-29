import { getAnyEntityInitialState } from './getAnyEntityInitialState.ts';

type EntitiesIndex = keyof EntitiesPayload;

export function normalizeEntitiesPayload(entities: EntitiesPayload): NormalizedEntitiesPayload {
    const newEntities = {} as NormalizedEntitiesPayload;

    Object.keys(entities).forEach((entity) => {
        if (entity) {
            newEntities[entity as keyof NormalizedEntitiesPayload] = getAnyEntityInitialState();
            const newEntity = newEntities[entity as keyof NormalizedEntitiesPayload] as OneOfEntitiyState;

            entities[entity as EntitiesIndex]?.forEach((item) => {
                newEntity.byId[item.id] = { ...item };
                newEntity.ids.push(item.id);
            });
        }
    });

    return newEntities;
}
