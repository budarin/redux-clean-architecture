import React from 'react';

import { useStore } from '../../store.ts';
import { flippedFilters } from '../../domain/entities/navigationFilter/index.ts';

// components
import TodoList from '../../../components/TodoList /index.tsx';
import TodoListItemContainer from '../TodoListItem/index.tsx';

const getNavigationFilter = (state: State) => state.navigationFilter;

function TodoListContainer(): JSX.Element {
    const { key, filter } = useStore(getNavigationFilter);
    const filterKey = flippedFilters[filter];

    const filteredIds = useStore((state) => {
        return !!filterKey ? state.todos.idsByFilterId[key] : state.todos.idsByCategoryId[key as Id];
    });

    return (
        <TodoList category={filter}>
            {filteredIds.map((id) => (
                <TodoListItemContainer key={id} id={id} />
            ))}
        </TodoList>
    );
}

export default TodoListContainer;
