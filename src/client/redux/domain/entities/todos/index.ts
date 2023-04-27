import { UPDATE_ENTITIES } from '../../common/actions.ts';

import { anyEntityInitialState, createEmptyState, getNewState } from '../../common/state.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_TODO = 'DELETE_TODO' as const;

// Action creators
export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id,
});

type DeleteTodoAction = ReturnType<typeof deleteTodo>;

export type TodoAction = DeleteTodoAction | UpdateEntitiesAction;

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
