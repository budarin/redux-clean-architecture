import { UPDATE_ENTITIES } from '../common/actions';
import { onAction } from '../../middlewares/businessLogic.ts';

import { getNewEmptyTodoState, getNewTodoState } from './utils.ts';

import type { UpdateEntitiesAction } from '../common/actions';

// initial state
export const initialState = {
    byId: {},
    ids: [],
} as TodoState;

// Actions
export const ADD_TODO = 'ADD_TODO' as const;
export const DELETE_TODO = 'DELETE_TODO' as const;
export const UPDATE_TODO = 'UPDATE_TODO' as const;

// Action creators
export const addTodo = (todo: Todo) => ({
    type: ADD_TODO,
    payload: todo,
});

export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
    payload: id,
});

export const updateTodo = (todo: Todo) => ({
    type: UPDATE_TODO,
    payload: todo,
});

export type Action = ReturnType<typeof addTodo | typeof deleteTodo | typeof updateTodo> | UpdateEntitiesAction;

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
export default function todos(state = initialState, action: Action = {} as Action) {
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
