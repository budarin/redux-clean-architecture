import React from 'react';
import { useStore } from '../../store.ts';
import TodoListItem from '../../../components/TodoListItem/index.tsx';
import { updateTodo } from '../../domain/entities/todos/index.ts';

const TodoListItemContainer = React.memo(({ id }: { id: number }) => {
    const dispatch = useStore((state) => state.dispatch);
    const todo = useStore((state) => state.todos.byId[id as keyof typeof state.todos.byId].todo);

    const handleUpdate = React.useCallback(
        (updatedTodo: string) => {
            dispatch(updateTodo(id, updatedTodo));
        },
        [dispatch, id],
    );

    const handleChange = (e: { target: { value: string } }): void => {
        const updatedTodo = e.target.value;
        handleUpdate(updatedTodo);
    };

    return <TodoListItem todo={todo} handleChange={handleChange} />;
});

export default TodoListItemContainer;
