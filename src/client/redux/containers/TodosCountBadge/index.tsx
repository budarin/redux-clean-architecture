import React from 'react';

import { useStore } from '../../store.ts';
import { navigationFilterTypes } from '../../domain/entities/navigationFilter/index.ts';

import Badge from '../../../components/Badge/index.tsx';

type TodosCountBadgeProps = {
    id: NavigationFilterKey;
    navigationType: NavigationFilterType;
};

// selectors
const getTodoCount = (id: NavigationFilterKey, isCategory: boolean) => (state: State) => {
    return isCategory ? state.todos.idsByCategoryId[id as Id]?.length || 0 : state.todos.idsByFilterId[id].length;
};

function TodosCountBadge({ id, navigationType }: TodosCountBadgeProps): JSX.Element {
    const isCategory = navigationFilterTypes.category === navigationType;
    const todoCount = useStore(getTodoCount(id, isCategory));

    return <Badge count={todoCount} />;
}

export default TodosCountBadge;
