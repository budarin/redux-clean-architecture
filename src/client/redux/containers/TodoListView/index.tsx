import React from 'react';

import { useStore } from '../../store.ts';

// components
import TodoList from '../../../components/TodoList /index.tsx';
import TodoListContainer from '../TodoList/index.tsx';

const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListViewContainer(): JSX.Element {
    const { title } = useStore(getNavigationFilter);

    return (
        <TodoList category={title}>
            <TodoListContainer />
        </TodoList>
    );
}

export default TodoListViewContainer;
