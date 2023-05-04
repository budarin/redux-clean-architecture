import React from 'react';
import { shallow } from 'zustand/shallow';

import { useStore } from '../../store';
import { getDispatch } from '../../domain/common/selectors';
import { navigationFilterTypes, navigationFilters, setNavigationFilter } from '../../domain/entities/navigationFilter';

// components
import TodosCountBadge from '../TodosCountBadge/index.tsx';
import NavigationIPanelIem from '../../../components/NavigationIPanelIem';

import type { NavigationFiltersKey } from '../../domain/entities/navigationFilter';

type NavigationPanelItemContainerProps = {
    id: NavigationFilterKey;
    navigationType: NavigationFilterType;
};

//selectors
const selector = (id: NavigationFilterKey, navigationType: NavigationFilterType) => (state: State) => {
    let checked = false;
    let title = '';

    const filter = state.navigationFilter;
    const isCategory = navigationFilterTypes.category === navigationType;

    if (isCategory) {
        title = state.categories.byId[id as Id].category;
        checked = title === filter.title;
    } else {
        title = navigationFilters[id as NavigationFiltersKey];
        checked = id === filter.key;
    }

    return {
        isCategory,
        title,
        checked,
    };
};

const NavigationPanelItemContainer = ({ id, navigationType }: NavigationPanelItemContainerProps): JSX.Element => {
    const dispatch = useStore(getDispatch);

    const { isCategory, title, checked } = useStore(selector(id, navigationType), shallow);

    const handleChange = React.useCallback(
        (e: { target: { value: string } }): void => {
            const title = e.target.value;

            dispatch(setNavigationFilter(isCategory ? Number(id) : id, title, navigationType as NavigationFilterType));
        },
        [dispatch],
    );

    return (
        <NavigationIPanelIem title={title} checked={checked} handleChange={handleChange}>
            <TodosCountBadge id={id} navigationType={navigationType} />
        </NavigationIPanelIem>
    );
};

export default NavigationPanelItemContainer;
