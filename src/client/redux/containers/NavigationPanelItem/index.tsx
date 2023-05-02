import React, { useCallback } from 'react';

import { useStore } from '../../store';
import { getDispatch } from '../../domain/common/selectors';
import { FiltersKey, filters, setNavigationFilter } from '../../domain/entities/navigationFilter';

// components
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

const getNavigationFilter = (state: State) => state.navigationFilter;

type NavigationPanelItemContainerProps = {
    id: string | number;
    navigationType: string;
};

export const navigationTypes = {
    category: 'category',
    filter: 'filter',
};

const NavigationPanelItemContainer = ({ id, navigationType }: NavigationPanelItemContainerProps): JSX.Element => {
    const isCategoryNavigation = navigationType === navigationTypes.category;

    // FIXME: упростить логику
    const dispatch = useStore(getDispatch);

    const { key, filter } = useStore(getNavigationFilter);
    const categoriy = useStore(useCallback((state) => state.categories.byId[id as number], [id]));
    const count = useStore((state) =>
        isCategoryNavigation
            ? state.todos.idsByCategoryId[id as number]?.length || 0
            : state.todos.idsByFilterId[id].length,
    );

    const categoryOrFilterTitle = isCategoryNavigation ? categoriy.category : filters[id as FiltersKey];
    const isChecked = filter === categoryOrFilterTitle;

    const handleChange = React.useCallback(
        (e: { target: { value: string; dataset: { id: string | Id } } }): void => {
            const updatedTodo = e.target.value;
            const id = e.target.dataset.id;

            dispatch(setNavigationFilter(isCategoryNavigation ? Number(id) : id, updatedTodo));
        },
        [dispatch],
    );

    return (
        <NavigationIPanelIem
            id={id}
            title={categoryOrFilterTitle}
            count={count}
            checked={isChecked}
            handleChange={handleChange}
        />
    );
};

export default NavigationPanelItemContainer;
