import { UPDATE_ENTITIES } from '../../common/actions.ts';
import { onAction } from '../../../middlewares/businessLogic.ts';
import { updateFilterCounters } from './updateFilterCounters.ts';
import { createEmptyState } from '../../utils/createEmptyState.ts';
import { updateICategoryCounters } from './updateICategoryCounters.ts';
import { createEmptyTodoState } from '../../utils/createEmptyTodoState.ts';
import { everyIsEmptyArrayOrUndefined } from '../../utils/validation_utils/everyIsEmptyArrayOrUndefined.ts';

// check constraints utilities
import { checkTodoConstraints } from './checkConstraints/checkTodoConstraints.ts';
import { checkIconConstraints } from './checkConstraints/checkIconConstraints.ts';
import { checkStatusConstraints } from './checkConstraints/checkStatusConstraints.ts';
import { checkCategoryConstraints } from './checkConstraints/checkCategoryConstraints.ts';

import type { UpdateEntitiesAction } from '../../common/actions.ts';

// Actions
export const DELETE_TODO = 'DELETETODO' as const;
export const UPDATE_TODO = 'UPDATE_TODO' as const;

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

export type DeleteTodoAction = ReturnType<typeof deleteTodo>;
export type UpdateTodoAction = ReturnType<typeof updateTodo>;
export type TodoAction = DeleteTodoAction | UpdateTodoAction | UpdateEntitiesAction;

// @ts-ignore
// регистрируем middleware который обрабатывает UPDATE_TO action
// с целью проверки целостности обновляемых в store данных
onAction(UPDATE_TODO, (get, set, api, action: UpdateEntitiesAction) => {
    if (action.payload.entities && everyIsEmptyArrayOrUndefined(action.payload.entities) === false) {
        const iconIds = {} as IdsHash;
        const statusIds = {} as IdsHash;
        const categoryIds = {} as IdsHash;
        const store = api.getState() as State;
        const { todos, categories, statuses, icons } = action.payload.entities;

        if (icons && icons.length > 0) {
            checkIconConstraints(action, icons, iconIds);
        }

        if (statuses && statuses.length > 0) {
            checkStatusConstraints(action, statuses, statusIds);
        }

        if (categories && categories.length > 0) {
            checkCategoryConstraints(action, store, categories, iconIds, categoryIds);
        }

        if (todos && todos.length > 0) {
            checkTodoConstraints(action, store, todos, categoryIds, statusIds);
        }

        return api.originalDispatch({ ...action, type: UPDATE_ENTITIES });
    }
});

const initialState = createEmptyTodoState();

// reducer
export default function todosReducer(state = initialState, action = {} as TodoAction) {
    switch (action.type) {
        case UPDATE_ENTITIES: {
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
