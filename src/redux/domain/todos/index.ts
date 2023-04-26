import { UPDATE_ENTITIES } from '../common/actions';
import { entityInitialState } from '../common/state.ts';
import { onAction } from '../../middlewares/businessLogic.ts';
import { getNewEmptyTodoState, getNewTodoState } from './utils.ts';

import type { UpdateEntitiesAction } from '../common/actions';

// Actions
export const DELETE_TODO = 'DELETE_TODO' as const;

// Action creators
export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id,
});

export type Action = ReturnType<typeof deleteTodo> | UpdateEntitiesAction;

// check data constraints
// @ts-ignore
onAction(UPDATE_ENTITIES, (get, set, api, action: UpdateEntitiesAction) => {
    if (action.payload.todos[0].todo.length > 3) {
        action.payload.todos[0].todo = 'abc';
        return api.dispatch(action);
    }

    return api.dispatch(action);
});

// reducer
export default function todos(state = entityInitialState as TodoState, action: Action = {} as Action) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
            if (!action.payload.todos || Object.keys(action.payload.todos).length === 0) {
                return state;
            }

            const newSate = getNewTodoState(state);

            action.payload.todos.forEach((todo) => {
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

            const newSate = getNewEmptyTodoState();

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
