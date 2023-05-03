import React from 'react';

import { useStore } from '../../store.ts';
import { navigationFilterTypes } from '../../domain/entities/navigationFilter/index.ts';

// components
import TodoListItemContainer from '../TodoListItem/index.tsx';

// selectors
const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListContainer() {
    const { key, type } = useStore(getNavigationFilter);
    const isCategoryNavigation = navigationFilterTypes.category === type;

    const todoIds =
        useStore((state) => {
            return isCategoryNavigation ? state.todos.idsByCategoryId[key as Id] : state.todos.idsByFilterId[key];
        }) || [];

    return (
        <>
            {todoIds.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </>
    );
}

export default TodoListContainer;
