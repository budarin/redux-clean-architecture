import { INTERNAL_UPDATE_ENTITIES, UPDATE_ENTITIES } from '../../common/actions.ts';
import { updateFilterCounters } from './updateFilterCounters.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';
import { updateICategoryCounters } from './updateICategoryCounters.ts';
import { createEmptyTodoState } from '../../utils/createEmptyTodoState.ts';

import type { InternalUpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_TODO = 'DELETETODO' as const;

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
    type: UPDATE_ENTITIES,
    payload: { entities: { todos: [{ id, todo, deleted, completed, status_id: 1, category_id: 1 }] } },
});

export type DeleteTodoAction = ReturnType<typeof deleteTodo>;
export type UpdateTodoAction = ReturnType<typeof updateTodo>;
export type TodoAction = DeleteTodoAction | InternalUpdateEntitiesAction;

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

        case DELETE_TODO: {
            if (state.ids.length === 0) {
                return state;
            }

            const newSate = createEmptyState<TodoState>();

            Object.keys(state.byId).forEach((key) => {
                const id = Number(key);

                if (id !== action.payload.id) {
                    newSate.byId[id] = { ...state.byId[id] };
                }
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
        }

        default:
            return state;
    }
}
