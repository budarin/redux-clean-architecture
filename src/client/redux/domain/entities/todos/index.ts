import { toast } from 'react-toastify';

import {
    DELETE_ENTITY,
    DeleteEntityAction,
    INTERNAL_UPDATE_ENTITIES,
    deleteEntity,
    updateEntities,
} from '../../common/actions.ts';

import { delay } from '../../../../../common/promises/delay.ts';
import { onAction } from '../../../middlewares/businessLogic.ts';
import { updateFilterCounters } from './updateFilterCounters.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';
import { updateICategoryCounters } from './updateICategoryCounters.ts';
import { createEmptyTodoState } from '../../utils/createEmptyTodoState.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';
import { entityNames } from '../index.ts';

// Actions
export const UPDATE_TODO = 'UPDATE_TODO' as const;
export const DELETE_TODO = 'DELETE_TODO' as const;

// Action creators
export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: { id },
});

export const updateTodo = ({
    id,
    todo,
    deleted,
    completed,
}: {
    id: Id;
    todo: TodoTodo;
    deleted: TodoCompleted;
    completed: TodoCompleted;
}) => ({
    type: UPDATE_TODO,
    payload: { id, todo, deleted, completed, status_id: 1, category_id: 1 },
});

export type DeleteTodoAction = ReturnType<typeof deleteTodo>;
export type UpdateTodoAction = ReturnType<typeof updateTodo>;
export type TodoAction = DeleteEntityAction | InternalUpdateEntitiesAction;

onAction(UPDATE_TODO, async (aet, get, api, action) => {
    api.dispatch(updateEntities({ todos: [action.payload] }));
});

onAction(DELETE_TODO, async (aet, get, api, action) => {
    const { id } = action.payload;
    const dispatch = api.originalDispatch;

    // сохраняем предыдущее состояние todo
    const prevTodo = { ...api.getState().todos.byId[id] };

    // делаем оптимистичные изменения
    api.dispatch(deleteEntity(id, entityNames.todo));

    // имитируем запрос на сервер
    await delay(3000);

    // имитируем обработку ошибки на сервере
    delay(1000).then(() => api.dispatch(updateEntities({ todos: [prevTodo] })));
    toast.error(`Не удалось удалить задачу "${prevTodo.todo}". Задача будет восстановлена`);
});

const initialState = createEmptyTodoState();

// reducer
export default function todosReducer(state = initialState, action = {} as TodoAction) {
    switch (action.type) {
        case INTERNAL_UPDATE_ENTITIES: {
            if (!action.payload.entities?.todos || Object.keys(action.payload.entities.todos).length === 0) {
                return state;
            }

            let isAddedEntities = false;

            action.payload.entities.todos.forEach((todo) => {
                state.byId[todo.id] = { ...todo };

                if (!isAddedEntities && state.ids.indexOf(todo.id) === -1) {
                    isAddedEntities = true;
                }

                updateICategoryCounters(todo, state);
                updateFilterCounters(todo, state);
            });

            if (isAddedEntities) {
                // храним порядок элементов по id
                state.ids = Object.keys(state.byId).map(Number);
            }

            return state;
        }

        case DELETE_ENTITY: {
            const { id, entityName } = action.payload;

            if (entityName !== entityNames.todo) {
                return state;
            }

            const idx = state.ids[id];

            if (idx === -1) {
                return state;
            }

            // FIXME:
            // модифицируем состояние - создаем копии объектов массивов и удаляем id если он там был
            state.ids = [...state.ids];
            state.ids.splice(idx, 1);

            const { [id]: o, ...rest } = state.byId;
            state.byId = rest;

            const { idsByCategoryId, idsByFilterId } = state;

            Object.keys(idsByCategoryId).forEach((StrKey) => {
                const key = Number(StrKey);
                const idx = idsByCategoryId[key].indexOf(id);

                if (idx > -1) {
                    idsByCategoryId[key] = [...idsByCategoryId[key]];
                    idsByCategoryId[key].splice(idx, 1);
                }
            });

            Object.keys(idsByFilterId).forEach((key) => {
                const idx = idsByFilterId[key].indexOf(id);

                if (idx > -1) {
                    idsByFilterId[key] = [...idsByFilterId[key]];
                    idsByFilterId[key].splice(idx, 1);
                }
            });

            return state;
        }

        default:
            return state;
    }
}
