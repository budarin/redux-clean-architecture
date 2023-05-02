import React, { memo, useCallback } from 'react';

import {
    navigationFilterTypes,
    navigationFilters,
    setNavigationFilter,
    type NavigationFiltersKey,
} from '../../domain/entities/navigationFilter';

import { useStore } from '../../store';
import { getDispatch } from '../../domain/common/selectors';

// components
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

//selectors
const getNavigationFilter = (state: State) => state.navigationFilter;
const getCategory = (id: Id) => useCallback((state: State) => state.categories.byId[id as Id], [id]);

type NavigationPanelItemContainerProps = {
    id: NavigationFilterKey;
    navigationType: NavigationFilterType;
};

const NavigationPanelItemContainer = memo(({ id, navigationType }: NavigationPanelItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);

    // FIXME: упростить логику

    const navigationFilter = useStore(getNavigationFilter);
    const categoriy = useStore(getCategory(id as Id));
    const isCategoryNavigation = navigationFilterTypes.category === navigationType;

    const todoCount = useStore(
        useCallback(
            (state) =>
                isCategoryNavigation
                    ? state.todos.idsByCategoryId[id as Id]?.length || 0
                    : state.todos.idsByFilterId[id].length,
            [id],
        ),
    );

    const title = isCategoryNavigation ? categoriy.category : navigationFilters[id as NavigationFiltersKey];
    const isChecked = navigationFilter.title === title;

    const handleChange = React.useCallback(
        (e: { target: { value: string } }): void => {
            const title = e.target.value;

            dispatch(
                setNavigationFilter(
                    isCategoryNavigation ? Number(id) : id,
                    title,
                    navigationType as NavigationFilterType,
                ),
            );
        },
        [dispatch],
    );

    return <NavigationIPanelIem title={title} todoCount={todoCount} checked={isChecked} handleChange={handleChange} />;
});

export default NavigationPanelItemContainer;
