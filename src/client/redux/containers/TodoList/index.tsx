import React from 'react';

import { useStore } from '../../store.ts';
import { navigationFilterTypes } from '../../domain/entities/navigationFilter/index.ts';

// components
import TodoList from '../../../components/TodoList /index.tsx';
import TodoListItemContainer from '../TodoListItem/index.tsx';

const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListContainer(): JSX.Element {
    const { key, title, type } = useStore(getNavigationFilter);
    const isCategoryNavigation = navigationFilterTypes.category === type;

    const todoIds = useStore((state) => {
        return isCategoryNavigation ? state.todos.idsByCategoryId[key as Id] : state.todos.idsByFilterId[key];
    });

    return (
        <TodoList category={title}>
            {todoIds.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </TodoList>
    );
}

export default TodoListContainer;
