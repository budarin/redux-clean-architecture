import React, { useCallback } from 'react';

import { useStore } from '../../store.ts';
import { navigationFilterTypes } from '../../domain/entities/navigationFilter/index.ts';

// components
import TodoList from '../../../components/TodoList /index.tsx';
import TodoListContainer from '../TodoList/index.tsx';

const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListViewContainer(): JSX.Element {
    const { title, type } = useStore(getNavigationFilter);
    const isCategoryNavigation = navigationFilterTypes.category === type;

    return (
        <TodoList category={title}>
            <TodoListContainer />
        </TodoList>
    );
}

export default TodoListViewContainer;
