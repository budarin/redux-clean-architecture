/**
 * @jest-environment jsdom
 */

import { UPDATE_ENTITIES } from '../common/actions';
import todos, { Action, DELETE_TODO } from '../todos';

const initialState = {
    byId: {
        1: {
            id: 1,
            status_id: 1,
            todo: 'Buy groceries',
            completed: false,
            deleted: false,
        },
        2: {
            id: 2,
            status_id: 1,
            todo: 'Do laundry',
            completed: true,
            deleted: false,
        },
        3: {
            id: 3,
            status_id: 1,
            todo: 'Finish project',
            completed: false,
            deleted: false,
        },
    },
    ids: [1, 2, 3],
};

describe('todos редьюсер', () => {
    it('должен вернуть прежнее состояние если не указан actions', () => {
        expect(todos(initialState, {} as Action)).toEqual(initialState);
    });

    it('UPDATE_ENTITIES должен обновить todos данными из action', () => {
        const action = {
            type: UPDATE_ENTITIES,
            payload: {
                todos: [
                    {
                        id: 4,
                        status_id: 1,
                        todo: 'Clean room',
                        completed: false,
                        deleted: false,
                    },
                    {
                        id: 1,
                        status_id: 1,
                        todo: 'Buy groceries for the week',
                        completed: true,
                        deleted: false,
                    },
                ],
            },
        };

        const expectedState = {
            byId: {
                1: {
                    id: 1,
                    status_id: 1,
                    todo: 'Buy groceries for the week',
                    completed: true,
                    deleted: false,
                },
                2: {
                    id: 2,
                    status_id: 1,
                    todo: 'Do laundry',
                    completed: true,
                    deleted: false,
                },
                3: {
                    id: 3,
                    status_id: 1,
                    todo: 'Finish project',
                    completed: false,
                    deleted: false,
                },
                4: {
                    id: 4,
                    status_id: 1,
                    todo: 'Clean room',
                    completed: false,
                    deleted: false,
                },
            },
            ids: [1, 2, 3, 4],
        };

        const result = todos(initialState, action as Action);
        expect(result).toEqual(expectedState);
    });

    it('DELETE_TODO должен удалить элемент из todos', () => {
        const action = {
            type: DELETE_TODO,
            payload: 2,
        };

        const expectedState = {
            byId: {
                1: {
                    id: 1,
                    status_id: 1,
                    todo: 'Buy groceries',
                    completed: false,
                    deleted: false,
                },
                3: {
                    id: 3,
                    status_id: 1,
                    todo: 'Finish project',
                    completed: false,
                    deleted: false,
                },
            },
            ids: [1, 3],
        };

        expect(todos(initialState, action)).toEqual(expectedState);
    });
});
