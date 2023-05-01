import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';

import { updateFilterCounters } from './updateFilterCounters.ts';
import { updateICategoryCounters } from './updateICategoryCounters.ts';
import { createEmptyTodoState } from '../../utils/createEmptyTodoState.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_TODO = 'DELETETODO' as const;
export const UPDATE_TODO = 'UPDATE' as const;

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
    deleted: Completed;
    completed: Completed;
}) => ({
    type: UPDATE_TODO,
    payload: { entities: { todos: [{ id, todo, deleted, completed, status_id: 1, category_id: 1 }] } },
});

type DeleteTodoAction = ReturnType<typeof deleteTodo>;
type UpdateTodoAction = ReturnType<typeof updateTodo>;

export type TodoAction = DeleteTodoAction | UpdateTodoAction | UpdateEntitiesAction;

const initialState = createEmptyTodoState();

// reducer
export default function todos(state = initialState, action = {} as TodoAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.todos || Object.keys(action.payload.entities.todos).length === 0) {
                return state;
            }

            action.payload.entities.todos.forEach((todo) => {
                state.byId[todo.id] = { ...todo };
                updateICategoryCounters(todo, state);
                updateFilterCounters(todo, state);
            });

            // храним порядок элементов по id
            state.ids = Object.keys(state.byId).map(Number);

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
