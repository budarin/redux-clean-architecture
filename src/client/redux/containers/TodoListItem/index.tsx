import React, { useCallback } from 'react';
import { useStore } from '../../store.ts';

import { getDispatch } from '../../domain/common/selectors.ts';
import { updateTodo } from '../../domain/entities/todos/index.ts';

// components
import TodoListItem from '../../../components/TodoListItem/index.tsx';

const getTodoById = (id: number) => (state: State) => state.todos.byId[id as TodosStatesKey];

type TodoListItemContainerProps = { id: number };

const TodoListItemContainer = ({ id }: TodoListItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);
    const todo = useStore(useCallback((state: State) => state.todos.byId[id as TodosStatesKey], [id]));
    const status = useStore((state) => state.statuses.byId[todo.status_id as StatusesStatesKey]);

    const handleChange = React.useCallback(
        (e: { target: { checked: boolean } }): void => {
            const updatedTodo = e.target.checked;
            dispatch(
                updateTodo({
                    id: 1,
                    todo: String(Math.random()),
                    completed: updatedTodo,
                    deleted: Math.random() > 0.5,
                }),
            );
        },
        [dispatch, id],
    );

    return <TodoListItem todo={todo} status={status} handleChange={handleChange} />;
};

TodoListItemContainer.displayName = 'TodoListItemContainer';

export default TodoListItemContainer;
