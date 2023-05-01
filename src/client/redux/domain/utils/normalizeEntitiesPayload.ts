import { createEmptyState } from './createEmptyState.ts';
import { createEmptyTodoState } from './createEmptyTodoState.ts';

type EntitiesIndex = keyof EntitiesPayload;

export function normalizeEntitiesPayload(entities: EntitiesPayload): NormalizedEntitiesPayload {
    const newEntities = {} as NormalizedEntitiesPayload;

    Object.keys(entities).forEach((entity) => {
        if (entity) {
            entities[entity as EntitiesIndex]?.forEach((item) => {
                if (entity === 'todos') {
                    // @ts-ignore
                    newEntities[entity as NormalizedEntitiesPayloadKey] = createEmptyTodoState();
                    const newEntity = newEntities[entity as keyof NormalizedEntitiesPayload] as TodoState;

                    newEntity.byId[item.id] = { ...(item as Todo) };
                    newEntity.ids.push(item.id);

                    // если есть category_id - проверяем есть ли в idsByCategoryId такая категория
                    // обновляем idsByАшдеукId
                } else {
                    newEntities[entity as NormalizedEntitiesPayloadKey] = createEmptyState();
                    const newEntity = newEntities[entity as keyof NormalizedEntitiesPayload] as Exclude<
                        OneOfEntitiyState,
                        'TodosState'
                    >;
                    newEntity.byId[item.id] = { ...item };
                    newEntity.ids.push(item.id);
                }
            });
        }
    });

    return newEntities;
}
