import React, { memo, useCallback } from 'react';

import { useStore } from '../../store.ts';
import { getDispatch } from '../../domain/common/selectors.ts';
import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import TodoListItem from '../../../components/TodoListItem/index.tsx';

const getTodoById = (id: number) => useCallback((state: State) => state.todos.byId[id as TodosStatesKey], [id]);

type TodoListItemContainerProps = { id: number };

const TodoListItemContainer = memo(({ id }: TodoListItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);
    const todo = useStore(getTodoById(id));
    const status = useStore((state) => state.statuses.byId[todo.status_id as StatusesStatesKey]);

    const handleChange = React.useCallback(
        (e: { target: { checked: boolean } }): void => {
            const updatedTodo = e.target.checked;
            dispatch(
                updateTodo({
                    id: 1,
                    todo: String(Math.random()),
                    completed: updatedTodo,
                    deleted: updatedTodo,
                }),
            );
        },
        [dispatch, id],
    );

    return <TodoListItem todo={todo} status={status} handleChange={handleChange} />;
});

TodoListItemContainer.displayName = 'TodoListItemContainer';

export default TodoListItemContainer;
