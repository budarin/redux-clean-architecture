import React, { useCallback } from 'react';

import { useStore } from '../../store.ts';
import { getDispatch } from '../../domain/common/selectors.ts';
import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import TodoListItem from '../../../components/TodoListItem/index.tsx';

type TodoListItemContainerProps = { id: Id };

// selectors
const getTodoById = (id: Id) => (state: State) => state.todos.byId[id as Id];
const getTodoStatus = (status_id: TodoStatusId) => (state: State) => state.statuses.byId[status_id as Id];

const TodoListItemContainer = ({ id }: TodoListItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);

    const todo = useStore(getTodoById(id));
    const status = useStore(getTodoStatus(todo.status_id));

    const handleChange = React.useCallback(
        (e: { target: { checked: boolean } }): void => {
            const isChecked = e.target.checked;

            dispatch(
                updateTodo({
                    id: 1,
                    todo: String(Math.random()),
                    completed: isChecked,
                    deleted: isChecked,
                }),
            );
        },
        [dispatch, id],
    );

    return <TodoListItem todo={todo} status={status} handleChange={handleChange} />;
};

export default TodoListItemContainer;
