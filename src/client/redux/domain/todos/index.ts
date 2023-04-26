import { UPDATE_ENTITIES } from '../common/actions.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { anyEntityInitialState, createEmptyState, getNewState } from '../common/state.ts';

import type { UpdateEntitiesAction } from '../common/actions.ts';

// Actions
export const DELETE_TODO = 'DELETE_TODO' as const;

// Action creators
export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id,
});

type DeleteTodoAction = ReturnType<typeof deleteTodo>;

export type TodoAction = DeleteTodoAction | UpdateEntitiesAction;

// check data constraints
// @ts-ignore
onAction('UPDATE', (get, set, api, action: UpdateEntitiesAction) => {
    if (action.payload.entities) {
        const { todos } = action.payload.entities;

        if (todos && todos[0].todo.length > 3) {
            todos[0].todo = 'abc';
            return api.dispatch({ ...action, type: UPDATE_ENTITIES });
        }
    }

    return api.dispatch(action);
});

// reducer
export default function todos(state = anyEntityInitialState as TodoState, action = {} as TodoAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.entities?.todos || Object.keys(action.payload.entities.todos).length === 0) {
                return state;
            }

            const newSate = getNewState(state);

            action.payload.entities.todos.forEach((todo) => {
                newSate.byId[todo.id] = { ...todo };
            });

            // храним порядок элементов по id
            newSate.ids = Object.keys(newSate.byId).map(Number);

            return newSate;
        }

        case DELETE_TODO: {
            if (state.ids.length === 0) {
                return state;
            }

            const newSate = createEmptyState<TodoState>();

            Object.keys(state.byId).forEach((key) => {
                const id = Number(key);

                if (id !== action.payload) {
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
