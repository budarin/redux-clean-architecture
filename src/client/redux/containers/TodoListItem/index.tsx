import React, { useCallback } from 'react';
import { useStore } from '../../store.ts';

import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import TodoListItem from '../../../components/TodoListItem/index.tsx';

const TodoListItemContainer = ({ id }: { id: number }) => {
    const dispatch = useStore((state) => state.dispatch);
    const todo = useStore((state) => state.todos.byId[id as TodosStatesKey]);
    const status = useStore((state) => state.statuses.byId[todo.status_id as StatusesStatesKey]);

    const handleChange = React.useCallback(
        (e: { target: { value: string } }): void => {
            const updatedTodo = e.target.value;
            dispatch(updateTodo(id, updatedTodo));
        },
        [dispatch, id],
    );

    return <TodoListItem todo={todo} status={status} handleChange={handleChange} />;
};

TodoListItemContainer.displayName = 'TodoListItemContainer';

export default TodoListItemContainer;
