import React from 'react';

import { useStore } from '../../store.ts';

import TodoList from '../../../components/TodoList/index.tsx';
import TodoListItemContainer from '../TodoListItem/index.tsx';

const TodoListContainer = () => {
    const ids = useStore((state) => state.todos.ids);

    return (
        <TodoList>
            {ids.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </TodoList>
    );
};

export default TodoListContainer;
