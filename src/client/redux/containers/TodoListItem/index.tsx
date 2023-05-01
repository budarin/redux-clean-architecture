import React, { useCallback } from 'react';
import { useStore } from '../../store.ts';

import { getDispatch } from '../../domain/common/selectors.ts';
import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import TodoListItem from '../../../components/TodoListItem/index.tsx';

const getTodoById = (id: number) => (state: State) => state.todos.byId[id as TodosStatesKey];

const TodoListItemContainer = ({ id }: { id: number }) => {
    const dispatch = useStore(getDispatch);
    const todo = useStore(getTodoById(id));
    const status = useStore((state) => state.statuses.byId[todo.status_id as StatusesStatesKey]);

    const handleChange = React.useCallback(
        (e: { target: { checked: boolean } }): void => {
            const updatedTodo = e.target.checked;
            dispatch(updateTodo(id, updatedTodo));
        },
        [dispatch, id],
    );

    return <TodoListItem todo={todo} status={status} handleChange={handleChange} />;
};

TodoListItemContainer.displayName = 'TodoListItemContainer';

export default TodoListItemContainer;
